import axios from "axios";
import Account from "./helpers/Account";

const { REACT_APP_API_URL } = process.env;

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
        window.location.href = '/';
    }
    return Promise.reject(e);
});

class Api {

    static login(data) {
        return api.post('users/login', data)
    }

    static getUsers(query) {
        return api.get('users/list', { params: { query } })
    }

    static sendMessage(text, email) {
        return api.post('users/send', {text, email})
    }

    static getCategories() {
        return api.get('/categories/get/')
    }

    static createCategory(name) {
        return api.post('/categories/create/', {name})
    }

    static updateCategory(name, id) {
        return api.put('/categories/update/', {name, id})
    }

    static deleteCategory(id) {
        return api.delete(`/categories/delete/${id}`, )
    }

    static getBrands() {
        return api.get('/brands/get/')
    }

    static createBrand(name) {
        return api.post('/brands/create/', {name})
    }

    static updateBrand(name, id) {
        return api.put(`/brands/update/`, {name, id})
    }

    static deleteBrand(id) {
        return api.delete(`/brands/delete/${id}`);
    }

    static getProductsList(query) {
        return api.get('/products/get', { params: { query } });
    }

    static createProduct(formData) {
        return api.post('/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    static updateProduct(formData, id) {
        return api.put('/products/update', { formData, id });
    }

    static deleteProduct(id) {
        return api.delete(`/products/delete/${id}`);
    }


    static getProductItem(id) {
        return api.get(`/products/getItem${id}`);
    }

    static createProductItem(id, formData) {
        return api.post(`/products/createItem/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    static updateProductItem(id, formData) {
        return api.put(`/products/updateItem/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    static deleteProductItem(id) {
        return api.delete(`/products/deleteItem/${id}`);
    }


    static getAllOrders(query) {
        return api.get(`/orders/getAll`, { params: { query } });
    }

    static getOrderItems(id) {
        return api.get(`/orders/getItem${id}`);
    }

    static changeOrderStatus(id) {
        return api.put(`/orders/change${id}`);
    }

}

export default Api;