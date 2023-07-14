import HttpError from 'http-errors';
import paypal from 'paypal-rest-sdk';
import {
  Cart, Orders, OrderItems, ProductItems, Users, CartItems,
} from '../models';
import sequelize from '../services/sequelize';

const { CLIENT_ID, APP_SECRET, FRONT_API_URL } = process.env;

paypal.configure({
  mode: 'sandbox',
  client_id: CLIENT_ID,
  client_secret: APP_SECRET,
});

class OrdersController {
  static paypal = async (req, res, next) => {
    try {
      const { amount, id } = req.body;
      const description = 'Payment for your order';

      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: `${FRONT_API_URL}/orders`,
          cancel_url: `${FRONT_API_URL}/order/id`,
        },
        transactions: [{
          item_list: {
            items: [{
              name: description,
              sku: '001',
              price: amount,
              currency: 'USD',
              quantity: 1,
            }],
          },
          amount: {
            currency: 'USD',
            total: amount,
          },
          description: id,
        }],
      };

      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          next(error);
          // throw HttpError(403, { errors: { payment: 'error' } });
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              res.json({
                url: payment.links[i].href,
                status: 'ok',
              });
              return;
              // res.send(payment.links[i].href);
              // console.log(payment.links[i]);
            }
          }
        }
      });
    } catch (e) {
      next(e);
    }
  };

  static executePayment = async (req, res, next) => {
    try {
      const { paymentId, PayerID } = req.query.query || {};

      paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, payment) => {
        if (error) {
          console.log(error);
        } else {
          const order = await Orders.findOne({
            // where: { id: payment.transactions[0].description.split('#')[1] }
            where: { id: payment.transactions[0].description },
          });

          order.paymentStatus = true;

          await order.save();

          // res.redirect('/success');
        }
      });

      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static createOrder = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const { formData, totalPrice, cartList } = req.body;
      const { userId } = req;

      const order = await Orders.create({
        userId,
        totalPrice,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
      }, { transaction });

      const createdOrderItems = cartList.map(async (cartListItem) => {
        const { productId, quantity } = cartListItem;
        const productItem = await ProductItems.findByPk(productId, { transaction });
        if (!productItem) {
          throw HttpError(403, { errors: { product: `Product item with id ${productId} not found` } });
        }

        if (productItem.quantity < quantity) {
          throw HttpError(403, { errors: { product: `Not enough quantity for product item with id ${productId}` } });
        }

        productItem.status = (productItem.quantity - quantity > 0) ? 'active' : 'inactive';
        productItem.quantity -= quantity;
        await productItem.save({ transaction });

        return OrderItems.create({
          name: cartListItem.cartProduct.product_item.name,
          price: cartListItem.price,
          quantity: cartListItem.quantity,
          orderId: order.dataValues.id,
        }, { transaction });
      });

      await Promise.all(createdOrderItems);

      const carts = await Cart.findOne({
        where: {
          userId,
        },
      });

      await CartItems.destroy(
        { where: { cartId: carts.id } },
      );

      carts.totalQuantity = 0;
      carts.totalPrice = 0;
      await carts.save({ transaction });
      await transaction.commit();

      res.json({
        order,
        status: 'ok',
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };

  static getByUserId = async (req, res, next) => {
    try {
      const userId = req.userId || '';
      const { page = 1 } = req.query.query || {};
      const limit = 10;

      const orders = await Orders.findAll({
        where: {
          userId,
        },

        order: [['createdAt', 'DESC']],

        limit,
        offset: (page - 1) * limit,
      });

      const total = await Orders.count({
        where: {
          userId,
        },
      });

      // if (!order) {
      //     return res.status(404).json({
      //         message: "Order not found",
      //     });
      // }

      res.json({
        orders,
        total,
        per_page: limit,
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static getAllOrders = async (req, res, next) => {
    try {
      const { page = 1 } = req.query.query || {};
      const limit = 6;

      const orders = await Orders.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset: (page - 1) * limit,
      });

      const total = await Orders.count();

      res.json({
        orders,
        total,
        per_page: limit,
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static getOrderItems = async (req, res, next) => {
    try {
      const { id } = req.params;

      const orderItems = await Orders.findOne({
        // where: { id, userId, status: 'pending' },
        where: { id },

        include: [
          {
            model: OrderItems,
            as: 'order_item',
            required: true,
          },

          {
            model: Users,
            as: 'order_user',
            required: true,
          },
        ],
      });

      if (!orderItems) {
        throw HttpError(403, { errors: { order: 'Order not found' } });
      }

      res.json({
        orderItems,
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static changeOrderStatus = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await Orders.findOne({
        where: { id },
      });

      if (!order) {
        throw HttpError(403, { errors: { order: 'Order not found' } });
      }

      order.status = 'completed';
      order.paymentStatus = true;
      await order.save();

      res.json({
        order,
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };
}

export default OrdersController;
