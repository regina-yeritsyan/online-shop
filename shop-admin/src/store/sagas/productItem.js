import {
    GET_PRODUCT_ITEM_REQUEST,
    GET_PRODUCT_ITEM_SUCCESS,
    GET_PRODUCT_ITEM_FAIL,
    CREATE_PRODUCT_ITEM_REQUEST,
    CREATE_PRODUCT_ITEM_SUCCESS,
    CREATE_PRODUCT_ITEM_FAIL,
    UPDATE_PRODUCT_ITEM_REQUEST,
    UPDATE_PRODUCT_ITEM_SUCCESS,
    UPDATE_PRODUCT_ITEM_FAIL,
    DELETE_PRODUCT_ITEM_REQUEST,
    DELETE_PRODUCT_ITEM_SUCCESS,
    DELETE_PRODUCT_ITEM_FAIL, getProductItem

} from "../actions/productItem";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_PRODUCT_ITEM_REQUEST, handleGetProductItemRequest)
    yield takeLatest(CREATE_PRODUCT_ITEM_REQUEST, handleCreateProductItemRequest)
    yield takeLatest(UPDATE_PRODUCT_ITEM_REQUEST, handleUpdateProductItemRequest)
    yield takeLatest(DELETE_PRODUCT_ITEM_REQUEST, handleDeleteProductItemRequest)
}

function* handleGetProductItemRequest(action) {
    try {
        const { id } = action.payload;
        const { data } = yield call(Api.getProductItem, id);
        yield put({
            type: GET_PRODUCT_ITEM_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_PRODUCT_ITEM_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleCreateProductItemRequest(action) {
    try {
        const { id, formData } = action.payload;
        const { data } = yield call(Api.createProductItem, id, formData);
        yield put({
            type: CREATE_PRODUCT_ITEM_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getProductItem(id))

    } catch (e) {
        yield put({
            type: CREATE_PRODUCT_ITEM_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleUpdateProductItemRequest(action) {

    try {
        const { id, formData } = action.payload;
        const { data } = yield call(Api.updateProductItem, id, formData);
        yield put({
            type: UPDATE_PRODUCT_ITEM_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getProductItem(id))

    } catch (e) {
        yield put({
            type: UPDATE_PRODUCT_ITEM_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleDeleteProductItemRequest(action) {
    try {
        const { id, productId } = action.payload;
        const { data } = yield call(Api.deleteProductItem, id);
        yield put({
            type: DELETE_PRODUCT_ITEM_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getProductItem(productId))

    } catch (e) {
        yield put({
            type: DELETE_PRODUCT_ITEM_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}
