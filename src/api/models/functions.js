import model from './models/index';

const findModel = (modelName) => {
  let mo;
  switch (modelName) {
    case 'profile':
      mo = model.profile;
      break;

    default:
      break;
  }
  return mo;
};

const findOne = async (modelName, data) => {
  // eslint-disable-next-line
  const Model = findModel(modelName);
  return (Model.findOne(data));
};

export default {
  findOne,
};