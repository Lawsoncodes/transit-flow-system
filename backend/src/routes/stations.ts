import { Router } from 'express';
import { query } from '../config/database';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get all stations
router.get('/', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT *, 
             CASE 
               WHEN current_occupancy < capacity * 0.3 THEN 'low'
               WHEN current_occupancy < capacity * 0.7 THEN 'medium'
               ELSE 'high'
             END as congestion_level
      FROM stations 
      WHERE status = 'active'
      ORDER BY name
    `);

    res.json({ stations: result.rows });
  } catch (error) {
    next(error);
  }
});

export { router as stationRoutes };
