import { combineReducers } from "redux";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import users from './users';
import cart from './cart';
import order from './order';
import wishlist from './wishlist';


export default combineReducers({
    products,
    brands,
    categories,
    users,
    cart,
    order,
    wishlist

})






