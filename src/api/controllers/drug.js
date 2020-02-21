import drugService from '../services/drug';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/drug';

const createDrug = catchControllerError('createDrug', async (req, res) => {
  const requestData = validate(schemas.createDrug, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const drug = await drugService.createDrug(requestData, log);
  log.debug('createDrug service executed without error, sending back a success response');
  return res.status(201).json({ success: true, message: 'Drug created', data: drug });
});

const getDrug = catchControllerError('getDrug', async (req, res) => {
  const requestData = validate(schemas.getDrug, req.params);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const drug = await drugService.getDrug(requestData, log);
  if (!drug) {
    return res.status(404).json({ success: false, message: 'Drug not found' });
  }
  log.debug('getDrug service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Drug found', data: drug });
});

const updateDrug = catchControllerError('updateDrug', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.updateDrug, { ...req.body, ...req.params });
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const drug = await drugService.updateDrug(requestData, log);
  log.debug('updateDrug service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Drug updated', data: drug });
});

const matchDrug = catchControllerError('matchDrug', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.matchDrug, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const match = await drugService.matchDrug(requestData, log);
  log.debug('matchDrug service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Drug matched', data: match });
});

export default {
  getDrug,
  updateDrug,
  createDrug,
  matchDrug,
};
