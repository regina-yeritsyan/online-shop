import express from 'express';

import authorization from '../middlewares/authorization';
import FavoritesController from '../controllers/FavoritesController';
import { toggleFavoritesSchema } from '../schema/carts';
import validate from '../middlewares/validate';

const router = express.Router();

router.put('/toggle', authorization, validate(toggleFavoritesSchema), FavoritesController.toggleFavorites);
router.get('/get', authorization, FavoritesController.getWishlist);

export default router;
