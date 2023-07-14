import fs from 'fs';
import path from 'path';
import HttpError from 'http-errors';

import {
  ProductItems, Products, Brands, Categories, Ratings, Favorites,
} from '../models';

import filters from '../services/filterProduct';
import sequelize from '../services/sequelize';

class ProductsController {
  static getProducts = async (req, res, next) => {
    try {
      const {
        page = 1, search = '', brandId, categoryId,
      } = req.query.query || {};
      const limit = 20;
      // validation

      let where = {};
      if (search) {
        where = { name: { $like: `%${search}%` } };
      }

      const products = await Products.findAll({
        where,
        include: [
          {
            model: Brands,
            as: 'product_brand',
            required: true,
            where: brandId,
          }, {
            model: Categories,
            as: 'product_category',
            required: true,
            where: categoryId,
          },
        ],
        limit,
        offset: (page - 1) * limit,
      });

      const total = await Products.count();

      res.json({
        status: 'ok',
        products,
        total,
        per_page: limit,
      });
    } catch (e) {
      next(e);
    }
  };

  static createProducts = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        name, desc, price, qty, brandId, categoryId, color,
      } = req.body;
      const { file } = req;

      const exists = await Products.findOne({
        where: { name },
      });

      if (exists) {
        throw HttpError(422, { errors: { product: 'Product already exists' } });
      }

      const newProduct = await Products.create({
        name,
        description: desc,
        price,
        brandId,
        categoryId,
      }, { transaction });

      const filePath = path.join(__dirname, '../public', file.filename);
      fs.renameSync(file.path, filePath);

      const product = await ProductItems.create({
        quantity: qty,
        img: file.filename,
        color,
        productId: newProduct.id,
      }, { transaction });

      await transaction.commit();

      res.json({
        status: 'ok',
        product,
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };

  static updateProducts = async (req, res, next) => {
    try {
      const { id } = req.body;
      const {
        name, description, price, brandId, categoryId,
      } = req.body.formData;

      const exists = await Products.findOne({
        where: { name, id: { $not: id } },
      });

      if (exists) {
        throw HttpError(422, { errors: { product: 'Product already exists' } });
      }

      const newProduct = await Products.update({
        name,
        description,
        price,
        brandId,
        categoryId,
      }, {
        where: { id },
      });

      res.json({
        status: 'ok',
        newProduct,
      });
    } catch (e) {
      next(e);
    }
  };

  static deleteProducts = async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Products.findOne({
        where: { id },
      });

      if (!product) {
        throw HttpError(422, { errors: { product: 'Product not found' } });
      }

      const productItems = await ProductItems.findAll({ where: { productId: id } });
      const filenames = productItems.map((item) => item.img);

      await Products.destroy(
        { where: { id } },
      );

      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, '../public', filename);
        fs.unlinkSync(filePath);
      });

      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static getProductItem = async (req, res, next) => {
    try {
      const { id } = req.params;

      const products = await ProductItems.findAll({
        where: {
          productId: id,
        },
        include: [{
          model: Products,
          as: 'product_item',
          required: true,

          include: [
            {
              model: Brands,
              as: 'product_brand',
              required: true,
            }, {
              model: Categories,
              as: 'product_category',
              required: true,
            },
          ],

        }],

      });

      res.json({
        status: 'ok',
        products,

      });
    } catch (e) {
      next(e);
    }
  };

  static createProductItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { quantity, color } = req.body;
      const { file } = req;
      // validation

      const exists = await Products.findOne({
        where: { id },
      });

      if (!exists) {
        throw HttpError(422, { errors: { product: 'Product not found' } });
      }

      const x = await ProductItems.findOne({
        where: { productId: id, color },
      });

      if (x) {
        throw HttpError(422, { errors: { productItem: 'Already Exists' } });
      }

      const filePath = path.join(__dirname, '../public', file.filename);
      fs.renameSync(file.path, filePath);

      const product = await ProductItems.create({
        quantity,
        img: file.filename,
        color,
        productId: id,
      });

      res.json({
        status: 'ok',
        product,
      });
    } catch (e) {
      next(e);
    }
  };

  static updateProductItem = async (req, res, next) => {
    try {
      const { id } = req.params;

      const { quantity, color, id: productId } = req.body;
      const { file } = req;
      const status = quantity > 0 ? 'active' : 'inactive';

      // validation

      const exists = await Products.findOne({
        where: { id },
      });

      if (!exists) {
        throw HttpError(422, { errors: { product: 'Product not found' } });
      }

      const x = await ProductItems.findOne({
        where: { productId: id, color, id: { $not: productId } },
      });

      if (x) {
        throw HttpError(422, { errors: { productItem: 'Already Exists' } });
      }

      const filePath = path.join(__dirname, '../public', file.filename);
      fs.renameSync(file.path, filePath);

      const product = await ProductItems.update({
        quantity,
        img: file.filename,
        color,
        productId: id,
        status,
      }, {
        where: { id: productId },
      });

      res.json({
        status: 'ok',
        product,
      });
    } catch (e) {
      next(e);
    }
  };

  static deleteProductItem = async (req, res, next) => {
    try {
      const { id } = req.params;

      const productItem = await ProductItems.findOne({
        where: { id },
      });

      if (!productItem) {
        throw HttpError(422, { errors: { productItem: 'Product item not found' } });
      }

      const filename = productItem.img;

      await ProductItems.destroy({ where: { id } });

      const filePath = path.join(__dirname, '../public', filename);
      await fs.unlinkSync(filePath);

      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const {
        page = 1, search = '', category, brand, color, minPrice, maxPrice,
      } = req.query.query || {};
      const limit = 3;
      const userId = req.userId || '';

      const f = filters.filter(search, minPrice, maxPrice);

      // let categoryId;
      // if (category) {
      //     categoryId = { id: category }
      // }
      //
      // let brandId;
      // if (brand) {
      //     brandId = { id: brand }
      // }
      //
      // let col;
      // if (color) {
      //     col = { color, status: 'active' };
      // } else {
      //     col = { status: 'active' };
      // }

      const where = {
        ...(color && { color }),
        status: 'active',
      };

      const productItemsInclude = [{
        model: Products,
        as: 'product_item',
        required: true,
        where: f,

        include: [{
          model: Brands,
          as: 'product_brand',
          required: true,
          where: brand && { id: brand },
        }, {
          model: Categories,
          as: 'product_category',
          required: true,
          where: category && { id: category },
        }],
      }];

      let products = await ProductItems.findAll({
        where,
        group: ['product_item.id'],

        include: productItemsInclude,

        limit,
        offset: (page - 1) * limit,
      });

      const total = await ProductItems.count({
        distinct: true,
        col: 'productId',
        where,
        include: productItemsInclude,
      });

      const wishlist = await Favorites.findAll({
        where: { userId },
        attributes: ['productId'],
      });

      const productIds = wishlist.map((w) => w.productId);
      products = products.map((p) => {
        const inFavorite = productIds.includes(p.id);
        return {
          ...p.toJSON(),
          favorite: inFavorite,
        };
      });

      res.json({
        status: 'ok',
        products,
        total,
        per_page: limit,
      });
    } catch (e) {
      next(e);
    }
  };

  static getColors = async (req, res, next) => {
    try {
      // let colors = await ProductItems.findAll({
      //     attributes: [[sequelize.fn('DISTINCT', sequelize.col('color')), 'color']]
      // });

      // const colors = await ProductItems.distinct('color');

      const colors = await ProductItems.findAll({
        where: { status: 'active' },
        attributes: ['color'],
        group: 'color',
      });

      res.json({
        status: 'ok',
        colors,
      });
    } catch (e) {
      next(e);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userId || '';

      let product = await ProductItems.findOne({
        where: { id, status: 'active' },
        include: [{
          model: Products,
          as: 'product_item',
          required: true,

          include: [
            {
              model: Brands,
              as: 'product_brand',
              required: true,
            }, {
              model: Categories,
              as: 'product_category',
              required: true,
            },
          ],
        }],
      });

      const wishlist = await Favorites.findOne({
        where: { userId, productId: product.id },

      });

      product = {
        ...product.toJSON(),
        favorite: !!wishlist,
      };

      const products = await ProductItems.findAll({
        where: {
          productId: product.productId,
          status: 'active',
          // id: {$ne: product.id}
        },
        include: [{
          model: Products,
          as: 'product_item',
          required: true,

          include: [
            {
              model: Brands,
              as: 'product_brand',
              required: true,
            }, {
              model: Categories,
              as: 'product_category',
              required: true,
            },
          ],
        }],
      });

      const rating = await Ratings.findOne({
        where: { productId: product.productId, userId },
      });

      res.json({
        status: 'ok',
        product,
        products,
        rating,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default ProductsController;
