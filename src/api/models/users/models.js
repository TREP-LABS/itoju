import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  confirmedEmail: { type: Boolean, required: true },
  confirmedPhone: { type: Boolean, required: true },
});

userSchema.index({ email: true }, { background: false });

export default mongoose.model('user', userSchema);
