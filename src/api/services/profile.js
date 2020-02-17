import db from '../models';

const getProfile = async (user, log) => {
  log.debug('getting user profile');
  const profile = await db.profile.getProfile({ userId: user._id });
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
  const { email, age, gender } = data;

  const update = JSON.parse(JSON.stringify({ email, age, gender }));

  log.debug('Updating user profile');
  const profile = await db.profile.updateProfile(
    { userId: user._id }, update,
  );
  log.debug('Sending updated profile to the user');
  return profile;
};

export default {
  getProfile,
  updateProfile,
};
