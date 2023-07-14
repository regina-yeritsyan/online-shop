import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL ,
    GET_COLORS_REQUEST,
    GET_COLORS_SUCCESS,
    GET_COLORS_FAIL,
} from "../actions/categories";

const initialState = {
    categories: [],
    colors: [],
    categoriesRequestStatus: '',
    colorsRequestStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST: {
            return {
                ...state,
                categoriesRequestStatus: 'request',
                // categories: []
            }
        }

        case GET_CATEGORIES_SUCCESS: {
            const { categories } = action.payload.data

            return {
                ...state,
                categories,
                categoriesRequestStatus: 'ok'
            }
        }

        case GET_CATEGORIES_FAIL: {
            return {
                ...state,
                categoriesRequestStatus: 'fail',
            }
        }

        case GET_COLORS_REQUEST: {
            return {
                ...state,
                colorsRequestStatus: 'request',
            }
        }

        case GET_COLORS_SUCCESS: {
            const { colors } = action.payload.data
            return {
                ...state,
                colors,
                colorsRequestStatus: 'ok'
            }
        }

        case GET_COLORS_FAIL: {
            return {
                ...state,
                colorsRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
