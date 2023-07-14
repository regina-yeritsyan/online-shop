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

export const GET_ONE_PRODUCT_REQUEST = 'GET_ONE_PRODUCT_REQUEST';
export const GET_ONE_PRODUCT_SUCCESS = 'GET_ONE_PRODUCT_SUCCESS';
export const GET_ONE_PRODUCT_FAIL = 'GET_ONE_PRODUCT_FAIL';

export function getOneProduct(id) {
    return {
        type: GET_ONE_PRODUCT_REQUEST,
        payload: {
            id
        }
    }
}

export const CREATE_PRODUCT_RATING_REQUEST = 'CREATE_PRODUCT_RATING_REQUEST';
export const CREATE_PRODUCT_RATING_SUCCESS = 'CREATE_PRODUCT_RATING_SUCCESS';
export const CREATE_PRODUCT_RATING_FAIL = 'CREATE_PRODUCT_RATING_FAIL';

export function createProductRating(productId, rate) {
    return {
        type: CREATE_PRODUCT_RATING_REQUEST,
        payload: {
            productId, rate
        }
    }
}
