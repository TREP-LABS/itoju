import db from '../models';
import ServiceError from './common/serviceError';

const createDisease = async (data, log) => {
  log.debug('Executing createDisease service');
  const { name, description } = data;
  const existingDisease = await db.symptom.getDisease({ name });
  if (existingDisease) {
    log.debug('Disease already exist, throwing error');
    throw new ServiceError('Disease already exist', 409);
  }
  log.debug('Gathering data for creating Disease');
  const diseaseDetails = { name, description };
  const purifyDiseaseDetails = JSON.parse(JSON.stringify(diseaseDetails));
  log.debug('creating disease');
  const disease = await db.disease.createDisease(purifyDiseaseDetails);
  log.debug('Returning created disease to user');
  return disease;
};

const getDisease = async (data, log) => {
  const { name } = data;
  log.debug('getting Disease');
  const disease = await db.disease.getDisease({ name });
  log.debug('returning disease to user');
  return disease;
};

const updateDisease = async (data, log) => {
  const { name, description, diseaseId } = data;

  const update = JSON.parse(JSON.stringify({ name, description }));

  log.debug('Updating disease');
  const disease = await db.disease.updateDisease(
    { _id: diseaseId }, update,
  );
  log.debug('Sending updated disease to the user');
  return disease;
};

export default {
  getDisease,
  updateDisease,
  createDisease,
};
