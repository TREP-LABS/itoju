import Joi from '@hapi/joi';
import common from './common';

export const createDisease = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

export const getDisease = Joi.object({
  name: Joi.string().required(),
});

export const updateDisease = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  diseaseId: common.validResourceId.messages({
    'any.invalid': '"diseaseId" in params is not valid',
  }).required(),
});
