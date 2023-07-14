import jwt from 'jsonwebtoken';
import HttpError from 'http-errors';

const { JWT_SECRET } = process.env;

const authorization = async (req, res, next) => {
  try {
    const { authorization: headerAuthorization = '' } = req.headers;

    let userId;
    try {
      const d = jwt.verify(headerAuthorization.replace('Bearer ', ''), JWT_SECRET);
      userId = d.userId;
    } catch (e) {
      //
    }

    if (!userId) {
      throw HttpError(401);
    }

    req.userId = userId;
    next();
  } catch (e) {
    next(e);
  }
};

export default authorization;
