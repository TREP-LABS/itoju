import express from 'express';
import controllers from '../controllers';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', controllers.user.createUser);
router.post('/login', controllers.user.login);
router.get('/password/reset/:phoneNumber', controllers.user.resetPassword);
router.post('/password/reset/validate', controllers.user.validateOtp);
router.post('/password/reset', authMiddleware, controllers.user.newPassword);
router.put('/password/update', authMiddleware, controllers.user.updatePassword);

module.exports = router;
