import { call, put, takeLatest } from 'redux-saga/effects'
import Api from "../../Api";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USERS_LIST_REQUEST,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,

} from "../actions/users";

export default function* watcher() {
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(GET_USERS_LIST_REQUEST, handleGetUsersListRequest);
    yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessageRequest);

}


function* handleLogin(action) {
    try {
        const { formData, rememberMe } = action.payload;
        const { data } = yield call(Api.login, formData)
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                data, rememberMe
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: LOGIN_FAIL,
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

function* handleGetUsersListRequest(action) {
    try {

        const { query } = action.payload;
        const { data } = yield call(Api.getUsers, query)
        yield put({
            type: GET_USERS_LIST_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: GET_USERS_LIST_FAIL,
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

function* handleSendMessageRequest(action) {
    try {

        const { text, email } = action.payload;
        const { data } = yield call(Api.sendMessage, text, email)
        yield put({
            type: SEND_MESSAGE_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: SEND_MESSAGE_FAIL,
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
