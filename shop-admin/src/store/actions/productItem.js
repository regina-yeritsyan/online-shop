export const GET_PRODUCT_ITEM_REQUEST = 'GET_PRODUCT_ITEM_REQUEST';
export const GET_PRODUCT_ITEM_SUCCESS = 'GET_PRODUCT_ITEM_SUCCESS';
export const GET_PRODUCT_ITEM_FAIL = 'GET_PRODUCT_ITEM_FAIL';

export function getProductItem(id) {
    return {
        type: GET_PRODUCT_ITEM_REQUEST,
        payload: {
            id
        }
    }
}

export const CREATE_PRODUCT_ITEM_REQUEST = 'CREATE_PRODUCT_ITEM_REQUEST';
export const CREATE_PRODUCT_ITEM_SUCCESS = 'CREATE_PRODUCT_ITEM_SUCCESS';
export const CREATE_PRODUCT_ITEM_FAIL = 'CREATE_PRODUCT_ITEM_FAIL';

export function createProductItem(id, formData) {
    return {
        type: CREATE_PRODUCT_ITEM_REQUEST,
        payload: {
            id, formData
        }
    }
}

export const UPDATE_PRODUCT_ITEM_REQUEST = 'UPDATE_PRODUCT_ITEM_REQUEST';
export const UPDATE_PRODUCT_ITEM_SUCCESS = 'UPDATE_PRODUCT_ITEM_SUCCESS';
export const UPDATE_PRODUCT_ITEM_FAIL = 'UPDATE_PRODUCT_ITEM_FAIL';

export function updateProductItem(id, formData) {
    return {
        type: UPDATE_PRODUCT_ITEM_REQUEST,
        payload: {
            id, formData
        }
    }
}

export const DELETE_PRODUCT_ITEM_REQUEST = 'DELETE_PRODUCT_ITEM_REQUEST';
export const DELETE_PRODUCT_ITEM_SUCCESS = 'DELETE_PRODUCT_ITEM_SUCCESS';
export const DELETE_PRODUCT_ITEM_FAIL = 'DELETE_PRODUCT_ITEM_FAIL';

export function deleteProductItem(id, productId) {
    return {
        type: DELETE_PRODUCT_ITEM_REQUEST,
        payload: {
            id, productId
        }
    }
}