import express from 'express';
import users from './users';
import products from './products';
import brands from './brands';
import categories from './categories';
import cart from './cart';
import ratings from './ratings';
import orders from './orders';
import wishlist from './wishlist';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ title: 'Express' });
});

router.use('/users', users);
router.use('/cart', cart);
router.use('/products', products);
router.use('/brands', brands);
router.use('/categories', categories);
router.use('/ratings', ratings);
router.use('/orders', orders);
router.use('/wishlist', wishlist);

export default router;
