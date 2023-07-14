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

export const GET_USERS_LIST_REQUEST = 'GET_USERS_LIST_REQUEST';
export const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
export const GET_USERS_LIST_FAIL = 'GET_USERS_LIST_FAIL';

export function getUsersRequest(query) {
    return {
        type: GET_USERS_LIST_REQUEST,
        payload: {query}
    }
}

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL     = 'SEND_MESSAGE_FAIL';

export function sendMessage(text, email) {
    return {
        type: SEND_MESSAGE_REQUEST,
        payload: {
            text, email
        }
    }
}
