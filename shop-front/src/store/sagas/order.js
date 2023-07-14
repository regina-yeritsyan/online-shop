import {
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

import { takeLatest, call, put } from 'redux-saga/effects';


import Api from "../../Api";
import {getCartRequest} from "../actions/cart";

export default function* watcher() {
    yield takeLatest(CREATE_ORDER_REQUEST, handleCreateOrderRequest);
    yield takeLatest(GET_USER_ORDERS_REQUEST, handleGetUserOrdersRequest);
    yield takeLatest(GET_ORDER_ITEMS_REQUEST, handleGetOrderItemsRequest);
}

function* handleCreateOrderRequest(action) {
    try {
        const { formData, totalPrice, cartList, cb } = action.payload;
        const { data } = yield call(Api.createOrder, formData, totalPrice, cartList);

        yield put({
            type: CREATE_ORDER_SUCCESS,
            payload: {
                data
            }
        });

        if (cb) {
            cb(null, data);
        }
        yield put(getCartRequest());

    } catch (e) {
        yield put({
            type: CREATE_ORDER_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

        if (action.payload.cb) {
            action.payload.cb(e.response.data, null);
        }
    }
}

function* handleGetUserOrdersRequest(action) {

    try {
        const { query } = action.payload
        const { data } = yield call(Api.getUserOrders, query);
        yield put({
            type: GET_USER_ORDERS_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_USER_ORDERS_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleGetOrderItemsRequest(action) {
    try {
        const { id } = action.payload
        const { data } = yield call(Api.getOrderItems, id);
        yield put({
            type: GET_ORDER_ITEMS_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_ORDER_ITEMS_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}
