import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAIL,
    GET_ONE_PRODUCT_REQUEST,
    GET_ONE_PRODUCT_SUCCESS,
    GET_ONE_PRODUCT_FAIL,
    CREATE_PRODUCT_RATING_REQUEST,
    CREATE_PRODUCT_RATING_SUCCESS,
    CREATE_PRODUCT_RATING_FAIL,
} from "../actions/products";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_PRODUCTS_LIST_REQUEST, handleGetProductsListRequest);
    yield takeLatest(GET_ONE_PRODUCT_REQUEST, handleGetOneProductRequest);
    yield takeLatest(CREATE_PRODUCT_RATING_REQUEST, createProductRatingRequest);
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

function* handleGetOneProductRequest(action) {
    try {
        const { id } = action.payload;
        const { data } = yield call(Api.getOneProduct, id);

        yield put({
            type: GET_ONE_PRODUCT_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_ONE_PRODUCT_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* createProductRatingRequest(action) {
    try {
        const { productId, rate } = action.payload;
        const { data } = yield call(Api.createProductRating, productId, rate);

        yield put({
            type: CREATE_PRODUCT_RATING_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: CREATE_PRODUCT_RATING_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}
