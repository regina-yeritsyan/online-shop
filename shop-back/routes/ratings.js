import express from 'express';
import Rating from '../controllers/RatingsController';
import authorization from '../middlewares/authorization';
import { ratingSchema } from '../schema/carts';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/', authorization, validate(ratingSchema), Rating.rating);

export default router;
