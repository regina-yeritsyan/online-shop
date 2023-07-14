
import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_ITEMS_REQUEST,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAIL,
    CHANGE_ORDER_STATUS_REQUEST,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_ORDER_STATUS_FAIL, getOrders,
} from "../actions/orders";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_ORDERS_REQUEST, handleGetOrdersRequest)
    yield takeLatest(GET_ORDER_ITEMS_REQUEST, handleGetOrderItemsRequest)
    yield takeLatest(CHANGE_ORDER_STATUS_REQUEST, handleChangeOrderStatusRequest)

}

function* handleGetOrdersRequest(action) {
    try {

        const { query } = action.payload;
        const { data } = yield call(Api.getAllOrders, query);
        yield put({
            type: GET_ORDERS_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_ORDERS_FAIL,
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

function* handleChangeOrderStatusRequest(action) {
    try {

        const { id } = action.payload
        const { data } = yield call(Api.changeOrderStatus, id);
        yield put({
            type: CHANGE_ORDER_STATUS_SUCCESS,
            payload: {
                data
            }
        });

        // yield put(getOrders());

    } catch (e) {
        yield put({
            type: CHANGE_ORDER_STATUS_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

