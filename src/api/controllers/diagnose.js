import diagnosticService from '../services/diagnostic';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/diagnose';

const getDiagnostic = catchControllerError('getDiagnostic', async (req, res) => {
  const requestData = validate(schemas.getDiagnostic, req.query);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const diagnostic = await diagnosticService.getDiagnostic(requestData, log);
  log.debug('Diagnostic service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Diagnostic completed', data: diagnostic });
});

export default {
  getDiagnostic,
};
