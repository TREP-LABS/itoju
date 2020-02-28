import express from 'express';
import authRoute from './auth.route';
import drugRoute from './drug.route';
import profileRoute from './profile.route';
import diseaseRoute from './disease.route';
import diagnoseRoute from './diagnose.route';
import symptomsRoute from './symptom.route';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/v1/itoju', async (req, res) => res.json({ status: 'I am alive' }));
router.use('/v1/auth', authRoute);
router.use('/v1/drug', authMiddleware, drugRoute);
router.use('/v1/profile', authMiddleware, profileRoute);
router.use('/v1/disease', authMiddleware, diseaseRoute);
router.use('/v1/diagnose', authMiddleware, diagnoseRoute);
router.use('/v1/symptom', authMiddleware, symptomsRoute);

export default router;
