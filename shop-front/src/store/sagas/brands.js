import { GET_BRANDS_REQUEST, GET_BRANDS_SUCCESS, GET_BRANDS_FAIL } from "../actions/brands";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_BRANDS_REQUEST, handleGetBrandRequest)
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