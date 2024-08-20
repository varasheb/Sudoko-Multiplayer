import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';


export const signupValidator = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(30).required(), 
    email: Joi.string().email().required(),
    mobile: Joi.string().min(4).max(11).required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(13).required(), 
    gender: Joi.string().valid('male', 'female', 'other').required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message
  })
  } else {
    req.validatedBody = value;
    next();
  }
};

export const signinValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message
  })
  } else {
    req.validatedBody = value;
    next();
  }
};