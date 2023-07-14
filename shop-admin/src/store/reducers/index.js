import { combineReducers } from "redux";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import users from './users';
import productItem from './productItem';
import orders from './orders';


export default combineReducers({
    products,
    brands,
    categories,
    users,
    productItem,
    orders

})






