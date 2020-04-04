import db from '../models';

const getDiagnostic = async (data, log) => {
  log.debug('Executing getDiagnostic service');
  const { symptoms } = data;
  const symptomId = await db.symptom.getSymptom({ name: symptoms });
  log.debug('Get Symptoms to disease match from db');
  const matches = await db.symptom.getSymptomDiseaseMatch({ symptomId: symptomId._id });
  return matches;
};

export default {
  getDiagnostic,
};
