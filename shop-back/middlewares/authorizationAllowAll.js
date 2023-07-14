import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const authorizationAllowAll = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;

    let userId = '';
    try {
      const d = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET);
      userId = d.userId;
    } catch (e) {
      //
    }

    req.userId = userId;
    next();
  } catch (e) {
    next(e);
  }
};

export default authorizationAllowAll;
