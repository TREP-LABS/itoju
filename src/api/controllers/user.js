import userService from '../services/user';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/user';

const createUser = catchControllerError('CreateUser', async (req, res) => {
  const requestData = validate(schemas.createUser, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const user = await userService.createUser(requestData, log);
  log.debug('CreateUser service executed without error, sending back a success response');
  return res.status(201).json({ success: true, message: 'user created successfully', data: user });
});

const login = catchControllerError('Login', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.login, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { token, user } = await userService.login(requestData, log);
  log.debug('Login service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Login successfully', data: { token, user } });
});


const resetPassword = catchControllerError('resetPassword', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.resetPassword, req.params);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  await userService.resetPassword(requestData, log);
  log.debug('resetPassword service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Token sent' });
});

const validateOtp = catchControllerError('validateOtp', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.validateOtp, { ...req.body });
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const otp = await userService.validateOtp(requestData, log);
  log.debug('valiateOtp service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'OTP validation successful', data: otp });
});

const updatePassword = catchControllerError('UpdatePassword', async (req, res) => {
  const { log, user } = res.locals;
  const requestData = validate(schemas.updatePassword, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  await userService.updatePassword({ ...requestData, user }, log);
  log.debug('UpdatePassword service executed without error, sending back a success response');
  return res.status(204).json({});
});

const newPassword = catchControllerError('newPassword', async (req, res) => {
  const { log, user } = res.locals;
  const requestData = validate(schemas.newPassword, { ...req.body }, res);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  await userService.newPassword({ ...requestData, user }, log);
  log.debug('newPassword service executed without error, sending back a success response');
  return res.status(204).json({});
});

export default {
  login,
  createUser,
  resetPassword,
  updatePassword,
  newPassword,
  validateOtp,
};
