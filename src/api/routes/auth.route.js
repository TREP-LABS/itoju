import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/active', async (req, res) => res.json({ status: 'Auth routes are alive.' }));

router.post('/register', controllers.user.createUser);
router.post('/login', controllers.user.login);

module.exports = router;
