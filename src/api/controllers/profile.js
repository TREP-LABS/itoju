import profileService from '../services/profile';
import catchControllerError from './helpers/catchControllerError';
import invalidReqeust from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/profile';

/**
 * @description get user profile controller
 * @param {object} req Express request object
 * @param {object} res Express response object
 */
const getProfile = catchControllerError('getProfile', async (req, res) => {
  const { log, user } = res.locals;

  const profile = await profileService.getProfile(user, log);
  log.debug('getProfile service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'user profile', data: profile });
});

/**
 * @description Update user profile controller
 * @param {object} req Express request object
 * @param {object} res Express response object
 */
const updateProfile = catchControllerError('updateProfile', async (req, res) => {
  const { log, user } = res.locals;
  const requestData = validate(schemas.updateProfile, req.body);
  if (requestData.error) return invalidReqeust(res, { errors: requestData.error });

  const profile = await profileService.updateProfile(requestData, user, log);
  log.debug('updateProfile service executed without error, sending back a success response');
  return res.status(200).json({ success: true, message: 'profile updated', data: profile });
});

export default {
  getProfile,
  updateProfile,
};
