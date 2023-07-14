import jwt from 'jsonwebtoken';
import HttpError from 'http-errors';
import { Users } from '../models';

const { JWT_SECRET } = process.env;

const adminAuthorization = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;

    let userId;
    try {
      const d = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET);
      userId = d.userId;
    } catch (e) {
      //
    }

    if (!userId) {
      throw HttpError(401);
    }

    const user = await Users.findOne({
      where: { id: userId },
    });

    if (user.role !== 'ADMIN') throw HttpError(401);

    req.userId = userId;
    next();
  } catch (e) {
    next(e);
  }
};

export default adminAuthorization;
