
import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    getCategories
} from "../actions/categories";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(GET_CATEGORIES_REQUEST, handleGetCategoriesRequest)
    yield takeLatest(CREATE_CATEGORY_REQUEST, handleCreateCategoryRequest)
    yield takeLatest(UPDATE_CATEGORY_REQUEST, handleUpdateCategoryRequest)
    yield takeLatest(DELETE_CATEGORY_REQUEST, handleDeleteCategoryRequest)
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

function* handleCreateCategoryRequest(action) {
    try {
        const {name} = action.payload;

        const { data } = yield call(Api.createCategory, name);
        yield put({
            type: CREATE_CATEGORY_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getCategories())

    } catch (e) {
        yield put({
            type: CREATE_CATEGORY_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleUpdateCategoryRequest(action) {
    try {
        const {name, id} = action.payload;

        const { data } = yield call(Api.updateCategory, name, id);
        yield put({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getCategories())

    } catch (e) {
        yield put({
            type: UPDATE_CATEGORY_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleDeleteCategoryRequest(action) {
    try {
        const {id} = action.payload;

        const { data } = yield call(Api.deleteCategory, id);
        yield put({
            type: DELETE_CATEGORY_SUCCESS,
            payload: {
                data
            }
        });

        yield put(getCategories());

    } catch (e) {
        yield put({
            type: DELETE_CATEGORY_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}