import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female'] },
  image: { type: String },
  userId: {
    type: Schema.Types.ObjectId, required: true, unique: true, ref: 'user',
  },
});

profileSchema.index({ email: true }, { background: false });

export default mongoose.model('profile', profileSchema);
