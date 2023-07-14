import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_ITEMS_REQUEST,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAIL,
    CHANGE_ORDER_STATUS_REQUEST,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_ORDER_STATUS_FAIL,
} from "../actions/orders";

const initialState = {
    orders: [],
    orderItems: [],
    total_orders: undefined,
    getOrdersRequestStatus: '',
    getOrderItemsRequestStatus: '',
    changeOrderRequestStatus: '',
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_REQUEST: {
            return {
                ...state,
                getOrdersRequestStatus: 'request',
                // brands: []
            }
        }

        case GET_ORDERS_SUCCESS: {

            const { orders, total, per_page } = action.payload.data
            return {
                ...state,
                orders,
                total_orders: Math.ceil(total / per_page),
                getOrdersRequestStatus: 'ok'
            }
        }

        case GET_ORDERS_FAIL: {
            return {
                ...state,
                getOrdersRequestStatus: 'fail',
            }
        }

        case GET_ORDER_ITEMS_REQUEST: {
            return {
                ...state,
                getOrderItemsRequestStatus: 'request',
                // brands: []
            }
        }

        case GET_ORDER_ITEMS_SUCCESS: {
            const { orderItems } = action.payload.data
            return {
                ...state,
                orderItems,
                getOrderItemsRequestStatus: 'ok'
            }
        }

        case GET_ORDER_ITEMS_FAIL: {
            return {
                ...state,
                getOrderItemsRequestStatus: 'fail',
            }
        }

        case CHANGE_ORDER_STATUS_REQUEST: {
            return {
                ...state,
                changeOrderRequestStatus: 'request',
                // brands: []
            }
        }

        case CHANGE_ORDER_STATUS_SUCCESS: {
            return {
                ...state,
                changeOrderRequestStatus: 'ok'
            }
        }

        case CHANGE_ORDER_STATUS_FAIL: {
            return {
                ...state,
                changeOrderRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
