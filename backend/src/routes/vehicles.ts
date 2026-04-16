import { Router } from 'express';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get all vehicles
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT v.*, 
             (SELECT COUNT(*) FROM schedules s WHERE s.vehicle_id = v.id AND s.status = 'scheduled') as active_schedules
      FROM vehicles v 
      WHERE v.status = 'active'
      ORDER BY v.created_at DESC
    `);

    res.json({ vehicles: result.rows });
  } catch (error) {
    next(error);
  }
});

// Create vehicle (provider/admin only)
router.post('/', authenticateToken, requireRole(['provider', 'admin']), async (req: AuthRequest, res, next) => {
  try {
    const { provider_id, type, name, license_plate, capacity } = req.body;

    const result = await query(
      `INSERT INTO vehicles (provider_id, type, name, license_plate, capacity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [provider_id || req.user!.id, type, name, license_plate, capacity]
    );

    res.status(201).json({ message: 'Vehicle created successfully', vehicle: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

export { router as vehicleRoutes };
