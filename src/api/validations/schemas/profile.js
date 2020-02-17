import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export const updateProfile = Joi.object({
  email: Joi.string().email(),
  gender: Joi.string(),
  age: Joi.number().integer().min(1).max(120),
  image: Joi.string(),
});
