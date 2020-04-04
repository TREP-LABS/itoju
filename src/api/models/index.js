import mongoose from 'mongoose';
import setup from './setup';

setup();

export default {
  validResourceId: mongoose.Types.ObjectId.isValid,
};
