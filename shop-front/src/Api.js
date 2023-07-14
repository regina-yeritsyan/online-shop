import axios from "axios";
import Account from "./helpers/Account";

const { REACT_APP_API_URL, REACT_APP_FRONT_API_URL } = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const token = Account.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((r) => r, (e) => {
    if (e.response.status === 401) {
        Account.removeToken();
        // window.location.reload();
        window.location.href = '/login';
    }
    return Promise.reject(e);
});

class Api {

    static activation(query) {
        return api.get('users/confirm/', { params: query });
    }

    static registration(data) {
        const activationUri = `${REACT_APP_FRONT_API_URL}/activation/email`;
        return api.post('users/register', {data, activationUri});
    }

    static login(data) {
        return api.post('users/login', data);
    }

    static forgotPassword(email) {
        const activationUri = `${REACT_APP_FRONT_API_URL}/recover/password`;
        return api.post('users/forgot-password', {email, activationUri});
    }

    static confirmCode(query) {
        return api.get('users/confirm-code/', { params: query });
    }

    static recoverPassword(password, query) {
        return api.put('users/recover/', { password }, { params: query });
    }

    static getUser() {
        return api.get('users/profile');
    }

    static updateUser(formData) {
        return api.put('users/profile', formData);
    }

    static changePassword(password) {
        return api.put('users/change-password', password);
    }

    static getCategories() {
        return api.get('/categories/get/');
    }

    static getBrands() {
        return api.get('/brands/get/');
    }

    static getColors() {
        return api.get('/products/colors');
    }

    static getProductsList(query) {
        return api.get('/products/getAll', { params: { query } });
    }

    static getOneProduct(id) {
        return api.get(`/products/get${id}`);
    }

    static addToCart(productId, quantity) {
        return api.post(`/cart/`, { productId, quantity } );
    }

    static changeCartItemQty(productId, quantity) {
        return api.post(`/cart/change`, { productId, quantity } );
    }

    static getCart() {
        return api.get(`/cart/get` );
    }

    static deleteFromCart(id) {
        return api.delete(`/cart/delete/${id}`);
    }

    static createProductRating(productId, rate) {
        return api.post(`/ratings`, {productId, rate});
    }

    static createOrder(formData, totalPrice, cartList) {
        return api.post(`/orders`, {formData, totalPrice, cartList});
    }

    static getUserOrders(query) {
        return api.get(`/orders/get`, { params: { query } });
    }

    static getOrderItems(id) {
        return api.get(`/orders/getItem${id}`);
    }

    static toggleFavorites(productId) {
        return api.put(`/wishlist/toggle`, {productId});
    }

    static getWishlist() {
        return api.get(`/wishlist/get`);
    }

}

export default Api;