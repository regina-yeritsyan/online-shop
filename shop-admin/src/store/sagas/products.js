import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    getProductsList,

} from "../actions/products";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_PRODUCTS_LIST_REQUEST, handleGetProductsListRequest)
    yield takeLatest(CREATE_PRODUCT_REQUEST, handleCreateProductRequest)
    yield takeLatest(UPDATE_PRODUCT_REQUEST, handleUpdateProductRequest)
    yield takeLatest(DELETE_PRODUCT_REQUEST, handleDeleteProductRequest)
}

function* handleGetProductsListRequest(action) {
    try {
        const { query } = action.payload;
        const { data } = yield call(Api.getProductsList, query);

        yield put({
            type: GET_PRODUCTS_LIST_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_PRODUCTS_LIST_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleCreateProductRequest(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.createProduct, formData);

        yield put({
            type: CREATE_PRODUCT_SUCCESS,
            payload: {
                data
            }
        });

        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
        yield put(getProductsList())

    } catch (e) {
        yield put({
            type: CREATE_PRODUCT_FAIL,
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

function* handleUpdateProductRequest(action) {
    try {
        const { formData, id } = action.payload;
        const { data } = yield call(Api.updateProduct, formData, id);

        yield put({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: {
                data
            }
        });

        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
        yield put(getProductsList())

    } catch (e) {
        yield put({
            type: UPDATE_PRODUCT_FAIL,
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

function* handleDeleteProductRequest(action) {
    try {
        const { id } = action.payload;

        const { data } = yield call(Api.deleteProduct, id);
        yield put({
            type: DELETE_PRODUCT_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getProductsList())

    } catch (e) {
        yield put({
            type: DELETE_PRODUCT_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}
