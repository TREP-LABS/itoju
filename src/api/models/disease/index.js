import diseaseModel from './models';

const createDisease = async (data) => {
  const Model = diseaseModel;
  return new Model(data).save();
};

const getDisease = async (diseaseMatch) => {
  const Model = diseaseModel;
  return (Model.findOne(diseaseMatch));
};

const updateDisease = async (diseaseMatch, update) => {
  const Model = diseaseModel;
  return Model.findOneAndUpdate(diseaseMatch, update, { new: true });
};

export default {
  createDisease,
  getDisease,
  updateDisease,
};
