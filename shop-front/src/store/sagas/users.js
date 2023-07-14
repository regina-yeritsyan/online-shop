import { call, put, takeLatest } from 'redux-saga/effects'
import Api from "../../Api";

import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    UPDATE_USER_PASSWORD_REQUEST,
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAIL,
    EMAIL_ACTIVATION_REQUEST,
    EMAIL_ACTIVATION_SUCCESS,
    EMAIL_ACTIVATION_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CONFIRM_CODE_REQUEST,
    CONFIRM_CODE_SUCCESS,
    CONFIRM_CODE_FAIL,
    RECOVER_PASSWORD_REQUEST,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_FAIL,
} from "../actions/users";

export default function* watcher() {

    yield takeLatest(REGISTRATION_REQUEST, handleRegistration);
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(FORGOT_PASSWORD_REQUEST, handleForgotPassword);
    yield takeLatest(CONFIRM_CODE_REQUEST, handleConfirmCode);
    yield takeLatest(RECOVER_PASSWORD_REQUEST, handleRecoverPassword);
    yield takeLatest(GET_USER_INFO_REQUEST, handleGetUserInfo);
    yield takeLatest(UPDATE_USER_INFO_REQUEST, handleUpdateUserInfo);
    yield takeLatest(UPDATE_USER_PASSWORD_REQUEST, handleUpdateUserPassword);
    yield takeLatest(EMAIL_ACTIVATION_REQUEST, handleEmailActivation);

}

function* handleRegistration(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.registration, formData)
        yield put({
            type: REGISTRATION_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.warn(e);
        yield put({
            type: REGISTRATION_FAIL,
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

function* handleForgotPassword(action) {
    try {
        const { email, cb } = action.payload;
        const { data } = yield call(Api.forgotPassword, email)
        yield put({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: {
                data
            }
        })
        if (cb) {
            cb(null, data);
        }
    } catch (e) {
        yield put({
            type: FORGOT_PASSWORD_FAIL,
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

function* handleConfirmCode(action) {
    try {
        const { query,cb } = action.payload;
        const { data } = yield call(Api.confirmCode, query)
        yield put({
            type: CONFIRM_CODE_SUCCESS,
            payload: {
                data
            }
        })
        if (cb) {
            cb(null, data);
        }
    } catch (e) {
        yield put({
            type: CONFIRM_CODE_FAIL,
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

function* handleRecoverPassword(action) {
    try {
        const { password, query } = action.payload;
        const { data } = yield call(Api.recoverPassword, password, query)
        yield put({
            type: RECOVER_PASSWORD_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: RECOVER_PASSWORD_FAIL,
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

function* handleGetUserInfo() {
    try {
        const { data } = yield call(Api.getUser)
        yield put({
            type: GET_USER_INFO_SUCCESS,
            payload: {
                data
            }
        })

    } catch (e) {
        yield put({
            type: GET_USER_INFO_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}

function* handleUpdateUserInfo(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.updateUser, formData)
        yield put({
            type: UPDATE_USER_INFO_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.warn(e);
        yield put({
            type: UPDATE_USER_INFO_FAIL,
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

function* handleUpdateUserPassword(action) {
    try {
        const { password, cb } = action.payload;
        const { data } = yield call(Api.changePassword, password)
        yield put({
            type: UPDATE_USER_PASSWORD_SUCCESS,
            payload: {
                data
            }
        })
        if (cb) {
            cb(null, data);
        }
    } catch (e) {
        console.warn(e);
        yield put({
            type: UPDATE_USER_PASSWORD_FAIL,
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

function* handleEmailActivation(action) {
    try {
        const { query } = action.payload;
        const { data } = yield call(Api.activation, query)
        yield put({
            type: EMAIL_ACTIVATION_SUCCESS,
            payload: {
                data,
            }
        })

    } catch (e) {
        yield put({
            type: EMAIL_ACTIVATION_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

    }
}