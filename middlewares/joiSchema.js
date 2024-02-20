const Joi = require('joi');

exports.string = Joi.string().allow('');
exports.stringReq = Joi.string().required();
exports.numberReq = Joi.number().required();
exports.number = Joi.number().allow('');
exports.array = Joi.array().allow('');
exports.arrayReq = Joi.array().required();
