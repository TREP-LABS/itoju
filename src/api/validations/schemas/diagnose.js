import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export const getDiagnostic = Joi.object({
  symptoms: Joi.string().lowercase().required(),
});
