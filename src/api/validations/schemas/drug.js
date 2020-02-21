import Joi from '@hapi/joi';
import common from './common';

export const createDrug = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const getDrug = Joi.object({
  name: Joi.string().required(),
});

export const updateDrug = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  drugId: common.validResourceId.messages({
    'any.invalid': '"drugId" in params is not valid',
  }).required(),
});
