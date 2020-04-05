import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import model from '../models/schemas/user.model';

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header('req-token');
  try {
    if (!token || typeof token !== 'string') throw Error('');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await db.getOne(model.user, { _id: id });
    if (!user) throw Error('');
    res.locals.user = user;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    return res.status(401).json({ success: false, message: 'Unable to authenticate token' });
  }
  return next();
};

export default auth;
