export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAIL = 'GET_ORDERS_FAIL';

export function getOrders(query) {
    return {
        type: GET_ORDERS_REQUEST,
        payload: {query}
    }
}

export const GET_ORDER_ITEMS_REQUEST = 'GET_ORDER_ITEMS_REQUEST';
export const GET_ORDER_ITEMS_SUCCESS = 'GET_ORDER_ITEMS_SUCCESS';
export const GET_ORDER_ITEMS_FAIL = 'GET_ORDER_ITEMS_FAIL';

export function getOrderItems(id) {
    return {
        type: GET_ORDER_ITEMS_REQUEST,
        payload: {id}
    }
}

export const CHANGE_ORDER_STATUS_REQUEST = 'CHANGE_ORDER_STATUS_REQUEST';
export const CHANGE_ORDER_STATUS_SUCCESS = 'CHANGE_ORDER_STATUS_SUCCESS';
export const CHANGE_ORDER_STATUS_FAIL   = 'CHANGE_ORDER_STATUS_FAIL';

export function changeOrderStatus(id) {
    return {
        type: CHANGE_ORDER_STATUS_REQUEST,
        payload: {id}
    }
}
