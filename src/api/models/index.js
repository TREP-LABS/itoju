import mongoose from 'mongoose';
import setup from './setup';
import users from './users';
import profile from './profile';
import disease from './disease';
import symptom from './symptom';
import drug from './drug';

setup();

export default {
  users,
  profile,
  disease,
  symptom,
  drug,
  validResourceId: mongoose.Types.ObjectId.isValid,
};
