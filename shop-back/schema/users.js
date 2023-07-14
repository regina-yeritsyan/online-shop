import Joi from 'joi';

export const registerSchema = Joi.object({

  body: Joi.object({
    data: {
      firstName: Joi.string().alphanum().min(2).required(),
      lastName: Joi.string().alphanum().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(15).required(),
    },
    activationUri: Joi.string().required(),

  }),

});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(15).required(),
  }),
});

export const forgotSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    activationUri: Joi.string().required(),
  }),
});

export const confirmCodeSchema = Joi.object({
  query: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required().length(6).regex(/^\d+$/),
  }),
});

export const recoverPasswordSchema = Joi.object({

  body: Joi.object({
    password: Joi.string().min(4).max(15).required(),
  }),

  query: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required().length(6).regex(/^\d+$/),
  }),
});

export const userListSchema = Joi.object({
  query: Joi.object({
    query: Joi.object({
      page: Joi.number().min(1),
    }),
  }),
});

export const profileUpdateSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
  }),
});

export const passwordChangeSchema = Joi.object({
  body: Joi.object({
    oldPassword: Joi.string().min(4).max(15).required(),
    password: Joi.string().min(4).max(15).required(),
    confirm: Joi.string().min(4).max(15).required(),
  }),
});
