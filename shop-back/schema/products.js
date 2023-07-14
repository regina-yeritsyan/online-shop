import Joi from 'joi';

export const getAllSchema = Joi.object({
  query: Joi.object({
    query: Joi.object({
      page: Joi.number().min(1),
      search: Joi.string(),
      category: Joi.number(),
      brand: Joi.number(),
      color: Joi.string(),
      minPrice: Joi.number().min(1),
      maxPrice: Joi.number(),
    }),
  }),
});

export const createProductsSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    desc: Joi.string().min(10).required(),
    price: Joi.number().min(1).required(), // TODO decimal
    qty: Joi.number().min(1),
    brandId: Joi.number().required(),
    categoryId: Joi.number().required(),
    color: Joi.string().required(),
  }),
});

export const updateProductsSchema = Joi.object({
  body: Joi.object({
    formData: Joi.object({
      name: Joi.string().min(2).required(),
      description: Joi.string().min(10).required(),
      price: Joi.number().min(1).required(),
      brandId: Joi.number().required(),
      categoryId: Joi.number().required(),
    }).unknown(),
    id: Joi.number().required(),

  }).unknown(),
});
