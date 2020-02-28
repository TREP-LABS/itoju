import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  confirmedPhone: { type: Boolean, required: true },
});

const resetPasswordSchema = new Schema({
  phone: { type: String, required: true },
  token: { type: String, required: true },
});

userSchema.index({ phone: true }, { background: false });

const user = mongoose.model('user', userSchema);
const resetPassword = mongoose.model('resetPassword', resetPasswordSchema);

export default {
  user,
  resetPassword,
};
