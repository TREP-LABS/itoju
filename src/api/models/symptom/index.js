import symptomModel from './models';

const createSymptom = async (data) => {
  const Model = symptomModel.symptom;
  return new Model(data).save();
};

const getSymptom = async (symptomMatch) => {
  const Model = symptomModel.symptom;
  return (Model.findOne(symptomMatch));
};

const getSymptomDiseaseMatch = async (symptomMatch) => {
  const Model = symptomModel.symptomMatch;
  return (Model.findOne(symptomMatch));
};

const updateSymptom = async (symptomMatch, update) => {
  const Model = symptomModel.symptom;
  return Model.findOneAndUpdate(symptomMatch, update, { new: true });
};

const matchSymptom = async (data) => {
  const Model = symptomModel.symptomMatch;
  return new Model(data).save();
};

export default {
  createSymptom,
  getSymptom,
  updateSymptom,
  matchSymptom,
  getSymptomDiseaseMatch,
};
