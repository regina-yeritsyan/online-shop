import HttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';
import _ from 'lodash';
import { Cart, Users } from '../models';
import Mail from '../services/Mail';
import sequelize from '../services/sequelize';

const { JWT_SECRET } = process.env;

class UsersController {
  static register = async (req, res, next) => {
    try {
      const { data, activationUri } = req.body;
      const {
        firstName, lastName, email, password,
      } = data;

      const exists = await Users.findOne({
        where: { email },
      });
      if (exists) {
        if (exists.status === 'pending') {
          await Users.destroy({
            where: { email },
          });
        } else {
          throw HttpError(422, { errors: { email: 'Email already Exists' } });
        }
      }

      const activationCode = _.random(1, 999999).toString().padStart(6, '0');

      const user = await Users.create({
        firstName,
        lastName,
        email,
        password,
        activationCode,
      });

      await Mail.sendActivation(email, activationCode, activationUri).catch(console.trace);

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static forgotPassword = async (req, res, next) => {
    try {
      const { email, activationUri } = req.body;

      const user = await Users.findOne({
        where: { email },
      });

      if (!user || user.status !== 'active') {
        throw HttpError(422, { errors: { user: 'User not found' } });
      }

      const activationCode = _.random(1, 999999).toString().padStart(6, '0');

      user.activationCode = activationCode;
      await user.save();

      await Mail.sendPassword(email, activationCode, activationUri).catch(console.trace);

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static confirmCode = async (req, res, next) => {
    try {
      const { code, email } = req.query;

      const user = await Users.findOne({
        where: { email, activationCode: code },
      });
      if (!user) {
        throw HttpError(422, { errors: { user: 'Not found' } });
      }

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static recoverPassword = async (req, res, next) => {
    try {
      const { code, email } = req.query;
      const { password } = req.body;

      const user = await Users.findOne({
        where: { email, activationCode: code },
      });
      if (!user) {
        throw HttpError(422, { errors: { user: 'Not found' } });
      }

      user.password = password;
      user.activationCode = null;
      await user.save();

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      res.json({
        status: 'ok',
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static sendMessage = async (req, res, next) => {
    try {
      const { text, email } = req.body;

      await Mail.sendMessage(email, text).catch(console.trace);

      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static confirmMail = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const { code, email } = req.query;

      const user = await Users.findOne({
        where: { email, activationCode: code },
      });
      if (!user) {
        throw HttpError(404);
      }

      user.status = 'active';
      user.activationCode = null;

      await user.save({ transaction });
      await Cart.create({
        userId: user.id,
      }, { transaction });

      await transaction.commit();

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: {
          email,
          password: Users.passHash(password),
        },
      });

      if (!user) {
        throw HttpError(403, 'Invalid email or password');
      }

      if (user.status !== 'active') {
        throw HttpError(403, 'Click on the link sent to your email to become an active user and log in');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      res.json({
        status: 'ok',
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static profile = async (req, res, next) => {
    try {
      const { userId } = req;
      const user = await Users.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw HttpError(404, 'User not found');
      }

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static profileUpdate = async (req, res, next) => {
    try {
      const { userId } = req;
      const { firstName, lastName } = req.body;

      let user = await Users.findOne({
        where: {
          id: userId,
        },

      });

      if (!user) { throw HttpError(403, 'User not found'); }

      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();

      user = await Users.findOne({
        where: { id: userId },
      });

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static changePassword = async (req, res, next) => {
    try {
      const { userId } = req;
      const { oldPassword, password } = req.body;

      let user = await Users.findOne({
        where: {
          id: userId,
          password: Users.passHash(oldPassword),
        },

      });

      if (!user) { throw HttpError(403, 'Invalid password'); }

      user.password = password;
      await user.save();

      user = await Users.findOne({
        where: { id: userId },
      });

      res.json({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({
        where: { id },
      });

      if (!user) {
        throw HttpError(422, { errors: { user: 'User not found' } });
      }

      await Users.destroy(
        { where: { id } },
      );

      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  };

  static list = async (req, res, next) => {
    try {
      const { page = 1, s = '' } = req.query.query || {};
      const limit = 5;
      const where = {
        // status: 'active'
      };
      if (s) {
        where.$or = [
          { firstName: { $like: `%${s}%` } },
          { lastName: { $like: `%${s}%` } },
          { email: { $like: `%${s}%` } },
          Sequelize.where(Sequelize.literal('CONCAT(firstName, \' \', lastName)'), { $like: `%${s}%` }),
          Sequelize.where(Sequelize.literal('CONCAT(lastName, \' \', firstName)'), { $like: `%${s}%` }),
        ];
      }

      const { count, rows } = await Users.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
      });

      res.json({
        status: 'ok',
        users: rows,
        total: count,
        per_page: limit,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default UsersController;
