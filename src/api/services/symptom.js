import db from '../models/functions';
import model from '../models/schemas/symtoms.model';
import ServiceError from './common/serviceError';

const createSymptom = async (data, log) => {
  log.debug('Executing createSymptom service');
  const { name } = data;
  const existingSymptom = await db.getOne(model.symptom, { name });
  if (existingSymptom) {
    log.debug('Symptom already exist, throwing error');
    throw new ServiceError('Symptom already exist', 409);
  }

  log.debug('creating symptom');
  const symptom = await db.create(model.symptom, { name });
  log.debug('Returning created symptom to user');
  return symptom;
};

const getSymptom = async (data, log) => {
  const { name } = data;
  log.debug('getting symptom');
  const symptom = await db.getOne(model.symptom, { name });
  log.debug('returning symptom to user');
  return symptom;
};

const updateSymptom = async (data, log) => {
  const { name, symptomId } = data;

  log.debug('Updating symptom');
  const symptom = await db.updateOne(
    model.symptom, { _id: symptomId }, { name },
  );
  log.debug('Sending updated symptom to the user');
  return symptom;
};

const matchSymptom = async (data, log) => {
  const { symptomId, diseaseId } = data;
  const existingSymptomMatch = await db.getOne(model.symptomMatch, { symptomId, diseaseId });
  if (existingSymptomMatch) {
    log.debug('disease symptom already exist, throwing error');
    throw new ServiceError('Disease Symptom already exist', 409);
  }
  log.debug('creating match');
  const match = await db.create(model.symptomMatch, { symptomId, diseaseId });
  log.debug('Returning created symptom match to user');
  return match;
};

export default {
  getSymptom,
  updateSymptom,
  createSymptom,
  matchSymptom,
};
