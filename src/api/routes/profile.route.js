import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.put('/', controllers.profile.updateProfile);
router.get('/', controllers.profile.getProfile);

module.exports = router;
