import express from 'express';
import authRoute from './auth.route';

const router = express.Router();

router.get('v1/itoju', async (req, res) => res.json({ status: 'I am alive' }));
router.use('v1/auth', authRoute);

export default router;
