export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL';

export function registrationRequest(formData, cb) {
    return {
        type: REGISTRATION_REQUEST,
        payload: {
            formData, cb
        }
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export function loginRequest(formData, rememberMe, cb) {
    return {
        type: LOGIN_REQUEST,
        payload: {
            formData, rememberMe, cb
        }
    }
}

export function userLogOut() {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_LOGOUT
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL';

export function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST,
        payload: {}
    }
}

export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL';

export function updateUserInfoRequest(formData, cb) {
    return {
        type: UPDATE_USER_INFO_REQUEST,
        payload: {formData, cb}
    }
}

export const UPDATE_USER_PASSWORD_REQUEST = 'UPDATE_USER_PASSWORD_REQUEST';
export const UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS';
export const UPDATE_USER_PASSWORD_FAIL = 'UPDATE_USER_PASSWORD_FAIL';

export function updateUserPasswordRequest(password, cb) {
    return {
        type: UPDATE_USER_PASSWORD_REQUEST,
        payload: {password, cb}
    }
}

export const EMAIL_ACTIVATION_REQUEST = 'EMAIL_ACTIVATION_REQUEST';
export const EMAIL_ACTIVATION_SUCCESS = 'EMAIL_ACTIVATION_SUCCESS';
export const EMAIL_ACTIVATION_FAIL = 'EMAIL_ACTIVATION_FAIL';

export function emailActivationRequest(query) {
    return {
        type: EMAIL_ACTIVATION_REQUEST,
        payload: {query}
    }
}

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export function forgotPasswordRequest(email, cb) {
    return {
        type: FORGOT_PASSWORD_REQUEST,
        payload: {email, cb}
    }
}

export const CONFIRM_CODE_REQUEST = 'CONFIRM_CODE_REQUEST';
export const CONFIRM_CODE_SUCCESS = 'CONFIRM_CODE_SUCCESS';
export const CONFIRM_CODE_FAIL = 'CONFIRM_CODE_FAIL';

export function confirmCodeRequest(query, cb) {
    return {
        type: CONFIRM_CODE_REQUEST,
        payload: {query, cb}
    }
}

export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
export const RECOVER_PASSWORD_FAIL = 'RECOVER_PASSWORD_FAIL';

export function recoverPasswordRequest(password, query, cb) {
    return {
        type: RECOVER_PASSWORD_REQUEST,
        payload: {password, query, cb}
    }
}
