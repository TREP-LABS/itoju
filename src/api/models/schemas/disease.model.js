import mongoose from 'mongoose';

const { Schema } = mongoose;

const diseaseSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: { type: String },
});

export default mongoose.model('disease', diseaseSchema);
