import profileModel from './models';

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
const createProfile = async (userData) => {
  const Model = profileModel;
  return new Model(userData).save();
};

/**
 * @description Get a single user from the database
 * @param {object} userMatch An object describing how to select the user to be fetched
 * @param {string} [userMatch._id] The unique id of the user
 * @param {string} [userMatch.email] The email of the user
 * @returns {Promise} A promise that resolves or reject to the result of the database operation
 */
const getProfile = async (userMatch) => {
  const Model = profileModel;
  return (Model.findOne(userMatch).populate('userId'));
};

/**
 * @description Updates user data in the database
 * @param {object} userMatch An object describing how to select the user to be udpated
 * @param {string} [userMatch._id] The unique id of the user
 * @param {string} [userMatch.email] The email of the user
 * @param {object} update The data to patch with the existing user data
 * @returns {Promise} A promise that resolves or reject to the result of the database operation
 */
const updateProfile = async (userMatch, update) => {
  const Model = profileModel;
  return Model.findOneAndUpdate(userMatch, update, { new: true });
};

export default {
  createProfile,
  getProfile,
  updateProfile,
};
