import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  confirmedPhone: { type: Boolean, required: true },
});

userSchema.index({ phone: true }, { background: false });

export default mongoose.model('user', userSchema);
