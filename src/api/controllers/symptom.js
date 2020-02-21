import symptomService from '../services/symptom';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/symptom';

const createSymptom = catchControllerError('createSymptom', async (req, res) => {
  const requestData = validate(schemas.createSymptom, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const symptom = await symptomService.createSymptom(requestData, log);
  log.debug('createSymptom service executed without error, sending back a success response');
  return res.status(201).json({ success: true, message: 'Symptom created', data: symptom });
});

const getSymptom = catchControllerError('getSymptom', async (req, res) => {
  const requestData = validate(schemas.getSymptom, req.params);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const symptom = await symptomService.getSymptom(requestData, log);
  if (!symptom) {
    return res.status(404).json({ success: false, message: 'Symptom not found' });
  }
  log.debug('getSymptom service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Symptom found', data: symptom });
});

const updateSymptom = catchControllerError('updateSymptom', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.updateSymptom, { ...req.body, ...req.params });
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const symptom = await symptomService.updateSymptom(requestData, log);
  log.debug('updateSymptom service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Symptom updated', data: symptom });
});

const matchSymptom = catchControllerError('matchSymptom', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.matchSymptom, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const match = await symptomService.matchSymptom(requestData, log);
  log.debug('matchSymptom service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Symptom matched', data: match });
});

export default {
  getSymptom,
  updateSymptom,
  createSymptom,
  matchSymptom,
};
