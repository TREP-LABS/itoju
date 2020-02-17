import mongoose from 'mongoose';
import setup from './setup';
import users from './users';
import profile from './profile';

setup();

export default {
  users,
  profile,
  validResourceId: mongoose.Types.ObjectId.isValid,
};
