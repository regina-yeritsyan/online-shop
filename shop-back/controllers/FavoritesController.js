import HttpError from 'http-errors';
import {
  Products, ProductItems, Favorites, Brands, Categories,
} from '../models';

class FavoritesController {
  static toggleFavorites = async (req, res, next) => {
    try {
      const { userId } = req;
      const { productId } = req.body;

      const favorite = await Favorites.findOne({
        where: {
          userId,
          productId,
        },
      });

      const favorites = await Favorites.findAll({
        where: {
          userId,
        },
      });

      if (favorite) {
        await favorite.destroy();
        res.json({
          status: 'ok',
          message: 'Product removed from favorites',
          isFavorite: false,
        });
      } else {
        if (favorites.length >= 20) {
          throw HttpError(422, { errors: { favorites: 'The number of products added to favorites cannot exceed 20' } });
        }
        await Favorites.create({
          userId,
          productId,
        });
        res.json({
          status: 'ok',
          message: 'Product added to favorites',
          isFavorite: true,
          favorites: favorites.length,
        });
      }
    } catch (e) {
      next(e);
    }
  };

  static getWishlist = async (req, res, next) => {
    try {
      const { userId } = req;
      const { page = 1 } = req.query.query || {};

      let wishlist = await Favorites.findAll({
        where: {
          userId,
        },

        include: [{
          model: ProductItems,
          as: 'favorite_product',
          where: { status: 'active' },
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
        limit: 20,
        offset: (page - 1) * 20,
      });

      wishlist = wishlist.map((item) => item.favorite_product);

      wishlist = wishlist.map((w) => ({
        ...w.toJSON(),
        favorite: true,
      }));

      res.json({
        status: 'ok',
        wishlist,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default FavoritesController;
