import mongoose from 'mongoose';

const { Schema } = mongoose;

const drugSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: { type: String },
});

export default mongoose.model('drug', drugSchema);
