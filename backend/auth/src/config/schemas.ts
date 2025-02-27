import * as Joi from 'joi';


export const authSchema = {
  SignInDto: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  
  SignUpDto: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/[a-zA-Z]/).regex(/\d/).regex(/[@$!%*?&]/).required(),
    username: Joi.string().min(3).required(),
  }),
};
