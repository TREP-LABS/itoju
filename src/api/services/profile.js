import db from '../models';
import model from '../models/schemas/profile.model';
import userModel from '../models/schemas/user.model';

const getProfile = async (user, log) => {
  log.debug('getting user profile');
  const profile = await db.getOne(model, { userId: user._id }, { populate: { schema: 'userId' } });
  log.debug('returning profile to user');
  return {
    name: profile.userId.name,
    email: profile.email,
    phone: profile.userId.phone,
    age: profile.age,
    gender: profile.gender,
    confirmedPhone: profile.userId.confirmedPhone,
  };
};

const updateProfile = async (data, user, log) => {
  const {
    email, age, gender, name, phone,
  } = data;

  const update = JSON.parse(JSON.stringify({ email, age, gender }));
  const updateUser = JSON.parse(JSON.stringify({ name, phone }));

  log.debug('Updating user profile');
  const profile = await db.updateOne(
    model, { userId: user._id }, update,
  );
  const updatedUser = await db.updateOne(
    userModel.user,
    { _id: user._id }, updateUser,
  );
  log.debug('Sending updated profile to the user');
  return {
    name: updatedUser.name,
    phone: updatedUser.phone,
    email: profile.email,
    age: profile.age,
    gender: profile.gender,
  };
};

const uploadImage = async (data, log) => {
  const { image, user } = data;
  log.debug('uploading image');

  log.debug('Updating user profile');
  const profile = await db.updateOne(
    model, { userId: user._id }, { image: image.filename },
  );
  log.debug('Sending updated profile to the user');
  return profile;
};

export default {
  getProfile,
  updateProfile,
  uploadImage,
};
