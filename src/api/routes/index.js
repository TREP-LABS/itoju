import express from 'express';
import authRoute from './auth.route';
import profileRoute from './profile.route';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/v1/itoju', async (req, res) => res.json({ status: 'I am alive' }));
router.use('/v1/auth', authRoute);
router.use('/v1/profile', authMiddleware, profileRoute);

export default router;
