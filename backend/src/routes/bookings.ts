import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Create booking
router.post('/', authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { schedule_id, vehicle_id, seat_number } = req.body;
    const user_id = req.user!.id;

    // Check schedule availability
    const scheduleResult = await query(
      'SELECT available_seats, price FROM schedules WHERE id = $1 AND status = $2',
      [schedule_id, 'scheduled']
    );

    if (scheduleResult.rows.length === 0) {
      throw createError('Schedule not found or unavailable', 404);
    }

    const schedule = scheduleResult.rows[0];
    if (schedule.available_seats <= 0) {
      throw createError('No available seats', 400);
    }

    // Create booking
    const result = await query(
      `INSERT INTO bookings (user_id, schedule_id, vehicle_id, seat_number, total_amount)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, schedule_id, vehicle_id, seat_number, schedule.price]
    );

    // Update available seats
    await query(
      'UPDATE schedules SET available_seats = available_seats - 1 WHERE id = $1',
      [schedule_id]
    );

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking: result.rows[0] 
    });
  } catch (error) {
    next(error);
  }
});

// Get user bookings
router.get('/my-bookings', authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const user_id = req.user!.id;
    
    const result = await query(`
      SELECT b.*, s.departure_time, s.arrival_time,
             os.name as origin_station, ds.name as destination_station,
             v.name as vehicle_name, v.type
      FROM bookings b
      JOIN schedules s ON b.schedule_id = s.id
      JOIN stations os ON s.origin_station_id = os.id
      JOIN stations ds ON s.destination_station_id = ds.id
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
    `, [user_id]);

    res.json({ bookings: result.rows });
  } catch (error) {
    next(error);
  }
});

export { router as bookingRoutes };
