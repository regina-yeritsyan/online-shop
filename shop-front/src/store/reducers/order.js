import {
    SAVE_SHIPPING_ADDRESS,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    GET_ORDER_ITEMS_REQUEST,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAIL,
} from '../actions/order';

import { toast } from "react-toastify";
import Account from "../../helpers/Account";

const initialState = {
    orders: [],
    order: {},
    total_orders: 0,
    orderItems: [],
    shippingAddress: Account.getAddress(),
    shippingAddressStatus: '',
    createOrderRequestStatus: '',
    getUserOrdersRequestStatus: '',
    getOrderItemsRequestStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                createOrderRequestStatus: 'request',
            }
        }

        case CREATE_ORDER_SUCCESS: {
            const { order } = action.payload.data
            toast.success(`Order Created`)

            return {
                ...state,
                order,
                createOrderRequestStatus: 'ok'
            }
        }

        case CREATE_ORDER_FAIL: {
            return {
                ...state,
                createOrderRequestStatus: 'fail',
            }
        }

        case GET_USER_ORDERS_REQUEST: {
            return {
                ...state,
                getUserOrdersRequestStatus: 'request',
            }
        }

        case GET_USER_ORDERS_SUCCESS: {
            const { orders, total, per_page } = action.payload.data

            return {
                ...state,
                orders,
                total_orders: Math.ceil(total / per_page),
                getUserOrdersRequestStatus: 'ok'
            }
        }

        case GET_USER_ORDERS_FAIL: {
            return {
                ...state,
                getUserOrdersRequestStatus: 'fail',
            }
        }

        case GET_ORDER_ITEMS_REQUEST: {
            return {
                ...state,
                getOrderItemsRequestStatus: 'request',
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

        case SAVE_SHIPPING_ADDRESS: {
            const {data} = action.payload
            Account.setAddress(data)
            return {
                ...state,
                shippingAddress: data,
                shippingAddressStatus: 'ok',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
