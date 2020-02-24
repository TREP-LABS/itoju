import userModel from './models';

/**
 * @description Creates a new user from the data supplied
 * @param {object} userData an object containing user information
 * @param {string} [userData.name] The name of the user
 * @param {string} [userData.email] The email of the user
 * @param {string} [userData.phone] The phone of the user
 * @param {string} [userData.gender] The gender of the user
 * @param {string} [userData.age] The age of the user
 * @param {string} [userData.password] The password of the user
 * @returns {Promise} A promise that resolves or reject to the result of the database operation
 */
const createUser = async (userData) => {
  const Model = userModel.user;
  return new Model(userData).save();
};

/**
 * @description Get a single user from the database
 * @param {object} userMatch An object describing how to select the user to be fetched
 * @param {string} [userMatch._id] The unique id of the user
 * @param {string} [userMatch.email] The email of the user
 * @returns {Promise} A promise that resolves or reject to the result of the database operation
 */
const getUser = async (userMatch) => {
  const Model = userModel.user;
  return Model.findOne(userMatch);
};

/**
 * @description Get multiple users from the database
 * @param {object} userMatch An object describing how to select the users to be fetched
 * @param {string} [userMatch.hospitalId] The hospitalId of the users
 * @param {string} [userMatch.wardId] The wardId of the users
 * @param {array} userFields The properties to return for each user
 * @returns {Promise} A promise that resolves or reject to the result of the database operation
 */
const getAllUsers = async (userMatch, userType, userFields) => {
  const Model = userModel.user;
  const projection = userFields ? userFields.join(' ') : null;
  return Model.find(userMatch, projection);
};

/**
 * @description Updates user data in the database
 * @param {object} userMatch An object describing how to select the user to be udpated
 * @param {string} [userMatch._id] The unique id of the user
 * @param {string} [userMatch.email] The email of the user
 * @param {object} update The data to patch with the existing user data
 * @returns {Promise} A promise that resolves or reject to the result of the database operation
 */
const updateUser = async (userMatch, update) => {
  const Model = userModel.user;
  return Model.findOneAndUpdate(userMatch, update, { new: true });
};

const resetPassword = async (userMatch, update) => {
  const Model = userModel.resetPassword;
  return Model.findOneAndUpdate(userMatch, update, { new: true, upsert: true });
};

export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  resetPassword,
};
