const create = async (Model, data) => new Model(data).save();

const getOne = async (model, data, option) => {
  if (option && option.populate) {
    return (model.findOne(data).populate(option.populate.schema));
  }
  return (model.findOne(data));
};

const updateOne = async (model, match, update, option) => model.findOneAndUpdate(match, update, {
  new: true,
  upsert: option && option.upsert ? option.upsert : false,
});

export default {
  create,
  getOne,
  updateOne,
};
