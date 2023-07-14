import { all, fork } from 'redux-saga/effects';
import products from './products';
import brands from './brands';
import categories from './categories';
import users from './users';
import productItem from './productItem';
import orders from './orders';

export default function* watchers() {
    yield all([
        products,
        brands,
        categories,
        users,
        productItem,
        orders
    ].map(fork));
}
