import Joi from 'joi';

export const createCartItemSchema = Joi.object({
  body: Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number(),
  }),
});

export const changeCartItemSchema = Joi.object({
  body: Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
});

export const toggleFavoritesSchema = Joi.object({
  body: Joi.object({
    productId: Joi.number().required(),
  }),
});

export const ratingSchema = Joi.object({
  body: Joi.object({
    productId: Joi.number().required(),
    rate: Joi.number().min(1).max(5).required(),
  }),
});
