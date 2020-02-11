import userService from '../services/user';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/user';

/**
 * @description Controller for create admin user API operation
 * @param {object} req Express request object
 * @param {object} res Express response object
 */
const createUser = catchControllerError('CreateUser', async (req, res) => {
  const requestData = validate(schemas.createUser, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { log } = res.locals;
  const user = await userService.createUser(requestData, log);
  log.debug('CreateUser service executed without error, sending back a success response');
  return res.status(201).json({ success: true, message: 'user created successfully', data: user });
});

/**
 * @description User login controller
 * @param {object} req Express request object
 * @param {object} res Express response object
 */
const login = catchControllerError('Login', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.login, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const { token, user } = await userService.login(requestData, log);
  log.debug('Login service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'Login successfully', data: { token, user } });
});


/**
 * @description Update user password controller
 * @param {object} req Express request object
 * @param {object} res Express response object
 */
const updatePassword = catchControllerError('UpdatePassword', async (req, res) => {
  const { log } = res.locals;
  const requestData = validate(schemas.updatePassword, { ...req.body, ...req.params }, res);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  await userService.updatePassword(requestData, log);
  log.debug('UpdatePassword service executed without error, sending back a success response');
  return res.status(204).json({});
});

export default {
  login,
  createUser,
  updatePassword,
};
