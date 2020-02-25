import mongoose from 'mongoose';

const { Schema } = mongoose;

const symptomSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const symptomMatchSchema = new Schema({
  symptomId: {
    type: Schema.Types.ObjectId,
  },
  diseaseId: {
    type: Schema.Types.ObjectId, required: true, ref: 'disease',
  },
});

const symptomMatch = mongoose.model('symptomMatch', symptomMatchSchema);
const symptom = mongoose.model('symptom', symptomSchema);

export default {
  symptom, symptomMatch,
};
