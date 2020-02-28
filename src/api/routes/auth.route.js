import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import controllers from '../controllers';

const router = express.Router();

router.get('/active', async (req, res) => res.json({ status: 'Auth routes are alive.' }));

router.post('/register', controllers.user.createUser);
router.post('/login', controllers.user.login);
router.get('/password/reset/:phoneNumber', controllers.user.resetPassword);
router.post('/password/reset/validate', controllers.user.validateOtp);
router.post('/password/reset', authMiddleware, controllers.user.newPassword);

module.exports = router;
