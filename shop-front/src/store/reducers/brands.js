import { GET_BRANDS_REQUEST, GET_BRANDS_SUCCESS, GET_BRANDS_FAIL } from "../actions/brands";

const initialState = {
    brands: [],
    brandsRequestStatus: '',
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BRANDS_REQUEST: {
            return {
                ...state,
                brandsRequestStatus: 'request',
                // brands: []
            }
        }

        case GET_BRANDS_SUCCESS: {
            const { brands } = action.payload.data

            return {
                ...state,
                brands,
                brandsRequestStatus: 'ok'
            }
        }

        case GET_BRANDS_FAIL: {
            return {
                ...state,
                brandsRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
