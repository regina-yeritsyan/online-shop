import {
    DELETE_FROM_CART_REQUEST,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_FAIL,
    CHANGE_CART_ITEM_QTY_REQUEST,
    CHANGE_CART_ITEM_QTY_SUCCESS,
    CHANGE_CART_ITEM_QTY_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    getCartRequest
} from '../actions/cart';

import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(DELETE_FROM_CART_REQUEST, deleteFromCartRequest)
    yield takeLatest(CHANGE_CART_ITEM_QTY_REQUEST, changeCartItemQtyRequest)
    yield takeLatest(ADD_TO_CART_REQUEST, addToCartRequest)
    yield takeLatest(GET_CART_REQUEST, getCartRequests)
}

function* addToCartRequest(action) {
    try {

        const { productId, qty } = action.payload;
        const { data } = yield call(Api.addToCart, productId, qty);
        yield put({
            type: ADD_TO_CART_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: ADD_TO_CART_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* changeCartItemQtyRequest(action) {
    try {

        const { productId, qty } = action.payload;
        const { data } = yield call(Api.changeCartItemQty, productId, qty);
        yield put({
            type: CHANGE_CART_ITEM_QTY_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: CHANGE_CART_ITEM_QTY_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* getCartRequests(action) {
    try {

        const { data } = yield call(Api.getCart);

        yield put({
            type: GET_CART_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_CART_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* deleteFromCartRequest(action) {
    try {
        const {id} = action.payload;
        const { data } = yield call(Api.deleteFromCart, id);

        yield put({

            type: DELETE_FROM_CART_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getCartRequest())

    } catch (e) {
        yield put({
            type: DELETE_FROM_CART_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}