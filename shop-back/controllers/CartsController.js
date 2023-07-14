import HttpError from 'http-errors';
import {
  CartItems, Cart, Products, Brands, Categories, ProductItems,
} from '../models';
import sequelize from '../services/sequelize';

class Carts {
  static createCartItem = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const { quantity = 1, productId } = req.body;
      const { userId } = req;

      const cart = await Cart.findOne({
        where: {
          userId,
        },
      });

      const product = await ProductItems.findOne({
        where: { id: productId },
        include: {
          model: Products,
          as: 'product_item',
          required: true,
        },
      });

      const { price } = product.dataValues.product_item.dataValues;
      if (!product) {
        throw HttpError(422, { errors: { product: 'Product not found' } });
      }

      const exists = await CartItems.findOne({
        where: { cartId: cart.id, productId },
      });

      if (exists) {
        throw HttpError(422, { errors: { cartItems: 'This product is already in your cart' } });
      }

      if (cart.totalQuantity >= 20) {
        throw HttpError(422, { errors: { cartItems: 'The number of products added to the card cannot exceed 20' } });
      }

      const cartItem = await CartItems.create({
        subTotalPrice: price * quantity,
        productId,
        quantity,
        price,
        cartId: cart.id,
      }, { transaction });

      cart.totalQuantity += 1;
      cart.totalPrice += (price * quantity);

      await cart.save({ transaction });
      await transaction.commit();

      res.json({
        status: 'ok',
        cartItem,
        cart,
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };

  static changeCartItem = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const { quantity = 1, productId } = req.body;

      const { userId } = req;

      const cart = await Cart.findOne({
        where: {
          userId,
        },
      });

      const product = await ProductItems.findOne({
        where: { id: productId },
        include: {
          model: Products,
          as: 'product_item',
          required: true,
        },
      });

      const { price } = product.dataValues.product_item.dataValues;

      if (!product) {
        throw HttpError(422, { errors: { product: 'Product not found' } });
      }

      const cartItem = await CartItems.findOne({
        where: { cartId: cart.id, productId },
      });

      if (!cartItem) {
        throw HttpError(422, { errors: { cartItems: 'Cart item not found' } });
      }

      const oldQuantity = cartItem.quantity;

      cartItem.quantity = quantity;
      cartItem.subTotalPrice = price * quantity;
      await cartItem.save({ transaction });
      cart.totalPrice += (price * quantity - price * oldQuantity);
      await cart.save({ transaction });
      await transaction.commit();

      res.json({
        status: 'ok',
        cart,
        cartItem,
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };

  static deleteCartItem = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const productId = req.params.id;

      const { userId } = req;

      const cart = await Cart.findOne({
        where: {
          userId,
        },
      });

      const product = await ProductItems.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw HttpError(422, { errors: { product: 'Product not found' } });
      }

      const cartItem = await CartItems.findOne({
        where: { cartId: cart.id, productId },
      });

      await CartItems.destroy({
        where: { cartId: cart.id, productId },
        transaction,
      });

      cart.totalQuantity -= 1;
      cart.totalPrice -= cartItem.price * cartItem.quantity;

      await cart.save({ transaction });
      await transaction.commit();

      res.json({
        status: 'ok',
        cart,
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };

  static getCartData = async (req, res, next) => {
    try {
      const { userId } = req;

      const cart = await Cart.findOne({
        where: {
          userId,
        },
      });

      const cartItems = await CartItems.findAll({
        where: {
          cartId: cart.id,
        },
        include: [{
          model: ProductItems,
          as: 'cartProduct',
          required: true,

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

        }],
      });

      res.json({
        status: 'ok',
        cart,
        cartItems,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default Carts;
