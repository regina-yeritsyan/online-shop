
import {
    GET_BRANDS_REQUEST,
    GET_BRANDS_SUCCESS,
    GET_BRANDS_FAIL,
    CREATE_BRAND_REQUEST,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAIL,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
    getBrands
} from "../actions/brands";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_BRANDS_REQUEST, handleGetBrandRequest)
    yield takeLatest(CREATE_BRAND_REQUEST, handleCreateBrandRequest)
    yield takeLatest(UPDATE_BRAND_REQUEST, handleUpdateBrandRequest)
    yield takeLatest(DELETE_BRAND_REQUEST, handleDeleteBrandRequest)
}

function* handleGetBrandRequest(action) {
    try {

        const { data } = yield call(Api.getBrands);
        yield put({
            type: GET_BRANDS_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_BRANDS_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleCreateBrandRequest(action) {
    try {
        const {name} = action.payload;

        const { data } = yield call(Api.createBrand, name);
        yield put({
            type: CREATE_BRAND_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getBrands());

    } catch (e) {
        yield put({
            type: CREATE_BRAND_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleUpdateBrandRequest(action) {
    try {
        const {name, id} = action.payload;

        const { data } = yield call(Api.updateBrand, name, id);
        yield put({
            type: UPDATE_BRAND_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getBrands());

    } catch (e) {
        yield put({
            type: UPDATE_BRAND_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleDeleteBrandRequest(action) {
    try {
        const {id} = action.payload;

        const { data } = yield call(Api.deleteBrand, id);
        yield put({
            type: DELETE_BRAND_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getBrands());

    } catch (e) {
        yield put({
            type: DELETE_BRAND_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}
