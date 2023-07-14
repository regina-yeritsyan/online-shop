import HttpError from 'http-errors';

const validate = (schema) => (req, res, next) => {
  try {
    const valid = schema.unknown().validate(req, {
      abortEarly: false,
      dateFormat: 'iso',
    });

    if (valid.error) {
      const errors = {};
      valid.error.details.forEach((error) => {
        error.path.splice(0, error.path.length - 1);
        errors[error.path.join('.')] = error.message.split('"')[2];
        // const [, , errorMessage] = error.message.split('"');
        // errors[error.path.join('.')] = errorMessage;
      });
      throw HttpError(422, { errors });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validate;
