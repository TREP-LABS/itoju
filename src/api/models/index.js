import mongoose from 'mongoose';
import setup from './setup';
import users from './users';

setup();

export default {
  users,
  validResourceId: mongoose.Types.ObjectId.isValid,
};
