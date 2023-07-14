export const SAVE_SHIPPING_ADDRESS = 'SAVE_SHIPPING_ADDRESS';

export function saveShippingAddress(data) {
    return async (dispatch) => {
        try {
            dispatch({
                type: SAVE_SHIPPING_ADDRESS,
                payload: {data}
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

export function createOrder(formData, totalPrice, cartList, cb) {
    return {
        type: CREATE_ORDER_REQUEST,
        payload: {formData, totalPrice, cartList, cb}
    }
}

export const GET_USER_ORDERS_REQUEST = 'GET_USER_ORDERS_REQUEST';
export const GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS';
export const GET_USER_ORDERS_FAIL = 'GET_USER_ORDERS_FAIL';

export function getUserOrders(query) {
    return {
        type: GET_USER_ORDERS_REQUEST,
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
