import diseaseService from '../services/disease';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/disease';

const createDisease = catchControllerError('createDisease', async (req, res) => {
  const requestData = validate(schemas.createDisease, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const disease = await diseaseService.createDisease(requestData, log);
  log.debug('createDisease service executed without error, sending back a success response');
  return res.status(201).json({ success: true, message: 'Disease created', data: disease });
});

const getDisease = catchControllerError('getDisease', async (req, res) => {
  const requestData = validate(schemas.getDisease, req.params);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const disease = await diseaseService.getDisease(requestData, log);
  if (!disease) {
    return res.status(404).json({ success: false, message: 'Disease not found' });
  }
  log.debug('getDisease service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Disease found', data: disease });
});

const updateDisease = catchControllerError('updateDisease', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.updateDisease, { ...req.body, ...req.params });
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const disease = await diseaseService.updateDisease(requestData, log);
  log.debug('updateDisease service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Disease updated', data: disease });
});

export default {
  getDisease,
  updateDisease,
  createDisease,
};
