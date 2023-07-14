import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_COLORS_REQUEST,
    GET_COLORS_SUCCESS,
    GET_COLORS_FAIL,
} from "../actions/categories";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_CATEGORIES_REQUEST, handleGetCategoriesRequest);
    yield takeLatest(GET_COLORS_REQUEST, handleGetColorsRequest)
}

function* handleGetCategoriesRequest(action) {
    try {

        const { data } = yield call(Api.getCategories);
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_CATEGORIES_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleGetColorsRequest(action) {
    try {

        const { data } = yield call(Api.getColors);
        yield put({
            type: GET_COLORS_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_COLORS_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}