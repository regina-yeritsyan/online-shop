import {
    GET_BRANDS_REQUEST,
    GET_BRANDS_SUCCESS,
    GET_BRANDS_FAIL ,
    CREATE_BRAND_REQUEST,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAIL,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
} from "../actions/brands";

import { toast } from "react-toastify";

const initialState = {
    brands: [],
    brandsRequestStatus: '',
    createBrandRequestStatus: '',
    updateBrandRequestStatus: '',
    deleteBrandRequestStatus: '',
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

        case CREATE_BRAND_REQUEST: {
            return {
                ...state,
                createBrandRequestStatus: 'request',
                // brands: []
            }
        }

        case CREATE_BRAND_SUCCESS: {
            toast.success(`Brand created`);

            return {
                ...state,
                createBrandRequestStatus: 'ok'
            }
        }

        case CREATE_BRAND_FAIL: {

            const {errors} = action.payload.data;
            const error = errors.brand || errors.name;
            toast.error(` ${error}`);

            return {
                ...state,
                createBrandRequestStatus: 'fail',
            }
        }

        case UPDATE_BRAND_REQUEST: {
            return {
                ...state,
                updateBrandRequestStatus: 'request',
                // brands: []
            }
        }

        case UPDATE_BRAND_SUCCESS: {

            toast.success(`Brand updated`);
            return {
                ...state,
                updateBrandRequestStatus: 'ok'
            }
        }

        case UPDATE_BRAND_FAIL: {

            const {errors} = action.payload.data;
            const error = errors.brand || errors.name;
            toast.error(` ${error}`);
            return {
                ...state,
                updateBrandRequestStatus: 'fail',
            }
        }

        case DELETE_BRAND_REQUEST: {
            return {
                ...state,
                deleteBrandRequestStatus: 'request',
                // brands: []
            }
        }

        case DELETE_BRAND_SUCCESS: {
            toast.success(`Brand deleted`)
            return {
                ...state,
                deleteBrandRequestStatus: 'ok'
            }
        }

        case DELETE_BRAND_FAIL: {
            return {
                ...state,
                deleteBrandRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
