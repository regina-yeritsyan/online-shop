export const GET_PRODUCTS_LIST_REQUEST = 'GET_PRODUCTS_LIST_REQUEST';
export const GET_PRODUCTS_LIST_SUCCESS = 'GET_PRODUCTS_LIST_SUCCESS';
export const GET_PRODUCTS_LIST_FAIL = 'GET_PRODUCTS_LIST_FAIL';

export function getProductsList(query) {
    return {
        type: GET_PRODUCTS_LIST_REQUEST,
        payload: {
            query
        }
    }
}

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL';

export function createProduct(formData, cb) {
    return {
        type: CREATE_PRODUCT_REQUEST,
        payload: {
            formData, cb
        }
    }
}

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';

export function updateProduct(formData, id, cb) {
    return {
        type: UPDATE_PRODUCT_REQUEST,
        payload: {
            formData, id, cb
        }
    }
}

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';

export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT_REQUEST,
        payload: {
            id
        }
    }
}
