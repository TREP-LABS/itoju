import Joi from '@hapi/joi';
import common from './common';

const commonUserSchema = {
  name: Joi.string().trim(true).min(3),
  email: Joi.string().email(),
  phone: Joi.string(),
  gender: Joi.string(),
  age: Joi.string(),
  password: Joi.string().trim(true).min(7).pattern(/\d/)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .prefs({ abortEarly: true })
    .messages({
      'string.min': '"password" must be at least 7 character mix of capital, small letters with numbers',
      'string.pattern.base': '"password" must be at least 7 character mix of capital, small letters with numbers',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': '"confirmPassword" must match the password value',
  }),
};

export const createUser = Joi.object({
  name: commonUserSchema.name.required(),
  email: commonUserSchema.email.required(),
  phone: commonUserSchema.phone.required(),
  gender: commonUserSchema.gender.required(),
  age: commonUserSchema.age.required(),
  password: commonUserSchema.password.required(),
  confirmPassword: commonUserSchema.confirmPassword.required(),
});

export const updateUser = Joi.object({
  name: commonUserSchema.name,
  email: commonUserSchema.email,
  phone: commonUserSchema.phone,
});

export const login = Joi.object({
  email: commonUserSchema.email.required(),
  password: Joi.string().required(),
});

export const updatePassword = Joi.object({
  formerPassword: Joi.string().required(),
  newPassword: commonUserSchema.password.messages({
    'string.pattern.base': '"newPassword" must be at least 7 character mix of capital, small letters with numbers',
  }).required(),
  // Query params
  userId: common.validResourceId.message('"userId" in query params is not valid'),
});

export const regToken = Joi.string().label('regToken').required()
  .messages({
    'string.base': '"regToken" is a required query parameter',
    'any.required': '"regToken" is a required query parameter',
  });

export const getSingleUser = Joi.object({
  // Query params
  email: commonUserSchema.email.required(),
});
