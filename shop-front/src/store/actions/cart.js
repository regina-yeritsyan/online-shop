export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = 'ADD_TO_CART_FAIL';

export function addToCartRequest(productId, qty) {
    return {
        type: ADD_TO_CART_REQUEST,
        payload: {productId, qty}
    }
}

export const CHANGE_CART_ITEM_QTY_REQUEST = 'CHANGE_CART_ITEM_QTY_REQUEST';
export const CHANGE_CART_ITEM_QTY_SUCCESS = 'CHANGE_CART_ITEM_QTY_SUCCESS';
export const CHANGE_CART_ITEM_QTY_FAIL = 'CHANGE_CART_ITEM_QTY_FAIL';

export function changeCartItemQty(productId, qty) {
    return {
        type: CHANGE_CART_ITEM_QTY_REQUEST,
        payload: {productId, qty}
    }
}

export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAIL = 'GET_CART_FAIL';

export function getCartRequest() {
    return {
        type: GET_CART_REQUEST,
        payload: {}
    }
}

export const DELETE_FROM_CART_REQUEST = 'DELETE_FROM_CART_REQUEST';
export const DELETE_FROM_CART_SUCCESS = 'DELETE_FROM_CART_SUCCESS';
export const DELETE_FROM_CART_FAIL = 'DELETE_FROM_CART_FAIL';

export function deleteFromCartRequest(id) {
    return {
        type: DELETE_FROM_CART_REQUEST,
        payload: {id}
    }
}
