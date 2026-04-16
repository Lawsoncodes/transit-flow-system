import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get available schedules
router.get('/', async (req, res, next) => {
  try {
    const { origin, destination, date } = req.query;
    
    let queryText = `
      SELECT s.*, v.type, v.name as vehicle_name, v.capacity,
             os.name as origin_station_name, ds.name as destination_station_name
      FROM schedules s
      JOIN vehicles v ON s.vehicle_id = v.id
      JOIN stations os ON s.origin_station_id = os.id
      JOIN stations ds ON s.destination_station_id = ds.id
      WHERE s.status = 'scheduled' AND s.departure_time > CURRENT_TIMESTAMP
    `;
    
    const queryParams: any[] = [];
    
    if (origin) {
      queryText += ` AND os.name ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${origin}%`);
    }
    
    if (destination) {
      queryText += ` AND ds.name ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${destination}%`);
    }
    
    if (date) {
      queryText += ` AND DATE(s.departure_time) = $${queryParams.length + 1}`;
      queryParams.push(date);
    }
    
    queryText += ' ORDER BY s.departure_time ASC';
    
    const result = await query(queryText, queryParams);
    
    res.json({ schedules: result.rows });
  } catch (error) {
    next(error);
  }
});

export { router as scheduleRoutes };
