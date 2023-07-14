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
    USER_LOGOUT
} from "../actions/users";
import Account from "../../helpers/Account";
import { toast } from "react-toastify";

const initialState = {
    token: Account.getToken(),
    registrationRequestStatus: '',
    activationRequestStatus: '',
    loginRequestStatus: '',
    getUsersRequestStatus: '',
    sendMessageRequestStatus: '',
    deleteUserRequestStatus: '',
    users: [],
    profile: {},
    total_users: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequestStatus: 'request'
            }
        }

        case LOGIN_SUCCESS: {
            const { token, user } = action.payload.data;
            const { rememberMe } = action.payload;
            Account.setToken(token, rememberMe)
            return {
                ...state,
                token,
                profile: user,
                loginRequestStatus: 'ok'
            }
        }

        case LOGIN_FAIL: {
            const data = action.payload.data
            toast.error(`${data.message}`)
            return {
                ...state,
                loginRequestStatus: 'fail'
            }
        }

        case USER_LOGOUT: {

            const token = Account.removeToken();

            return {
                ...state,
                token,
                profile: {},
                userLogOutStatus: 'ok'
            }
        }



        case GET_USERS_LIST_REQUEST: {
            return {
                ...state,
                getUsersRequestStatus: 'request'
            }
        }

        case GET_USERS_LIST_SUCCESS: {
            const { users, total, per_page} = action.payload.data;

            return {
                ...state,
                users,
                total_users: Math.ceil(total / per_page),
                getUsersRequestStatus: 'ok'
            }
        }

        case GET_USERS_LIST_FAIL: {
            return {
                ...state,
                getUsersRequestStatus: 'fail'
            }
        }




        case SEND_MESSAGE_REQUEST: {
            return {
                ...state,
                sendMessageRequestStatus: 'request'
            }
        }

        case SEND_MESSAGE_SUCCESS: {
            toast.success(`The message has been sent`)

            return {
                ...state,
                sendMessageRequestStatus: 'ok'
            }
        }

        case SEND_MESSAGE_FAIL: {

            return {
                ...state,
                sendMessageRequestStatus: 'fail'
            }
        }

        default: {
            return state
        }
    }
}