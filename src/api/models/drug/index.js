import drugModel from './models';

const createDrug = async (data) => {
  const Model = drugModel;
  return new Model(data).save();
};

const getDrug = async (drugMatch) => {
  const Model = drugModel;
  return (Model.findOne(drugMatch));
};

const updateDrug = async (drugMatch, update) => {
  const Model = drugModel;
  return Model.findOneAndUpdate(drugMatch, update, { new: true });
};

export default {
  createDrug,
  getDrug,
  updateDrug,
};
