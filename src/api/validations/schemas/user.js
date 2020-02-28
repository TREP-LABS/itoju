import Joi from '@hapi/joi';

const commonUserSchema = {
  name: Joi.string().trim(true).min(3),
  phone: Joi.string(),
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
  phone: commonUserSchema.phone.required(),
  password: commonUserSchema.password.required(),
  confirmPassword: commonUserSchema.confirmPassword.required(),
});

export const updateUser = Joi.object({
  name: commonUserSchema.name,
  phone: commonUserSchema.phone,
});

export const login = Joi.object({
  phone: commonUserSchema.phone.required(),
  password: Joi.string().required(),
});

export const updatePassword = Joi.object({
  formerPassword: Joi.string().required(),
  newPassword: commonUserSchema.password.messages({
    'string.pattern.base': '"newPassword" must be at least 7 character mix of capital, small letters with numbers',
  }).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).messages({
    'any.only': '"confirmPassword" must match the newPassword value',
  }),
});

export const newPassword = Joi.object({
  password: commonUserSchema.password.messages({
    'string.pattern.base': '"Password" must be at least 7 character mix of capital, small letters with numbers',
  }).required(),
  confirmPassword: commonUserSchema.confirmPassword.required(),
});

export const resetPassword = Joi.object({
  phoneNumber: Joi.string().required(),
});

export const validateOtp = Joi.object({
  phoneNumber: Joi.string().required(),
  otp: Joi.number().required(),
});

export const regToken = Joi.string().label('regToken').required()
  .messages({
    'string.base': '"regToken" is a required query parameter',
    'any.required': '"regToken" is a required query parameter',
  });
