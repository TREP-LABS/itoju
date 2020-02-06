import express from 'express';
import authRoute from './auth.route';

const router = express.Router();

router.get('/itoju', async (req, res) => res.json({ status: 'I am alive' }));
router.use('/auth', authRoute);

export default router;
