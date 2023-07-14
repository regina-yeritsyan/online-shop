import {
    TOGGLE_FAVORITE_REQUEST,
    TOGGLE_FAVORITE_SUCCESS,
    TOGGLE_FAVORITE_FAIL,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
} from "../actions/wishlist";
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from "../../Api";

export default function* watcher() {
    yield takeLatest(TOGGLE_FAVORITE_REQUEST, toggleFavoriteRequest)
    yield takeLatest(GET_WISHLIST_REQUEST, getWishlistRequest)
}

function* toggleFavoriteRequest(action) {
    try {
        const { productId, cb } = action.payload;
        const { data } = yield call(Api.toggleFavorites, productId);

        yield put({
            type: TOGGLE_FAVORITE_SUCCESS,
            payload: {
                data
            }
        });

        if (cb) {
            cb(null, data);
        }

    } catch (e) {
        yield put({
            type: TOGGLE_FAVORITE_FAIL,
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

function* getWishlistRequest(action) {
    try {
        const { data } = yield call(Api.getWishlist);

        yield put({
            type: GET_WISHLIST_SUCCESS,
            payload: {
                data
            }
        });

    } catch (e) {
        yield put({
            type: GET_WISHLIST_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })
    }
}
