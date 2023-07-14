import { all, fork } from 'redux-saga/effects';
import products from './products';
import brands from './brands';
import categories from './categories';
import users from './users';
import cart from './cart';
import order from './order';
import wishlist from './wishlist';

export default function* watchers() {
    yield all([
        products,
        brands,
        categories,
        users,
        cart,
        order,
        wishlist
    ].map(fork));
}
