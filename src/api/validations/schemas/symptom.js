import Joi from '@hapi/joi';
import common from './common';

export const createSymptom = Joi.object({
  name: Joi.string().required(),
});

export const getSymptom = Joi.object({
  name: Joi.string().required(),
});

export const updateSymptom = Joi.object({
  name: Joi.string().required(),
  symptomId: common.validResourceId.messages({
    'any.invalid': '"symptomId" in params is not valid',
  }).required(),
});

export const matchSymptom = Joi.object({
  symptomId: common.validResourceId.messages({
    'any.invalid': '"symptomId" in body is not valid',
  }).required(),
  diseaseId: common.validResourceId.messages({
    'any.invalid': '"diseaseId" in body is not valid',
  }).required(),
});
