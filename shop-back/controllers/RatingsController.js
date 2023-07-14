import { Products, Ratings } from '../models';
import sequelize from '../services/sequelize';

class Rating {
  static rating = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const { productId, rate } = req.body;
      const { userId } = req;

      const exists = await Ratings.findOne({
        where: { productId, userId },
      });

      const product = await Products.findOne({
        where: { id: productId },
      });

      if (exists) {
        exists.rate = rate;
        await exists.save({ transaction });
      } else {
        const rating = await Ratings.create({
          productId,
          userId,
          rate,
        }, { transaction });

        product.numRating += 1;
      }

      const ratings = await Ratings.findAll({
        where: { productId },
      });

      let percent = 0;
      ratings.forEach((r) => (
        percent += r.rate
      ));

      percent /= ratings.length;
      product.rating = percent;
      await product.save({ transaction });

      await transaction.commit();

      res.json({
        status: 'ok',
        // rating,
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  };
}

export default Rating;
