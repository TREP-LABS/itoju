import db from '../models';
import ServiceError from './common/serviceError';

const createDrug = async (data, log) => {
  log.debug('Executing createDrug service');
  const { name, description } = data;
  const existingDrug = await db.symptom.getDrug({ name });
  if (existingDrug) {
    log.debug('Drug already exist, throwing error');
    throw new ServiceError('Drug already exist', 409);
  }
  log.debug('creating drug');
  const drug = await db.drug.createDrug({ name, description });
  log.debug('Returning created drug to user');
  return drug;
};

const getDrug = async (data, log) => {
  const { name } = data;
  log.debug('getting drug');
  const drug = await db.drug.getDrug({ name });
  log.debug('returning drug to user');
  return drug;
};

const updateDrug = async (data, log) => {
  const { name, description, drugId } = data;

  log.debug('Updating drug');
  const update = JSON.parse(JSON.stringify({ name, description }));
  const drug = await db.drug.updateDrug(
    { _id: drugId }, update,
  );
  log.debug('Sending updated drug to the user');
  return drug;
};

export default {
  getDrug,
  updateDrug,
  createDrug,
};
