import Joi from 'joi';

export const createOrderItemsSchema = Joi.object({
  body: Joi.object({
    formData: {
      country: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      address: Joi.string().min(2).required(),
      paymentMethod: Joi.string().valid('cash', 'paypal').required(),
      postalCode: Joi.string().min(2).required(),
    },
    totalPrice: Joi.number().min(1).required(),
    cartList: Joi.array().required(),
  }),
});

export const FindEmptyValueSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    id: Joi.number(),
  }),
});

export const getValidIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
