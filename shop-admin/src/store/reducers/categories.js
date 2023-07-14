import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL ,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
} from "../actions/categories";

import { toast } from "react-toastify";


const initialState = {
    categories: [],
    categoriesRequestStatus: '',
    createCategoryRequestStatus: '',
    updateCategoryRequestStatus: '',
    deleteCategoryRequestStatus: '',
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

        case CREATE_CATEGORY_REQUEST: {
            return {
                ...state,
                createCategoryRequestStatus: 'request',
                // categories: []
            }
        }

        case CREATE_CATEGORY_SUCCESS: {
            toast.success(`Category created`)

            return {
                ...state,
                createCategoryRequestStatus: 'ok'
            }
        }

        case CREATE_CATEGORY_FAIL: {

            const {errors} = action.payload.data;
            const error = errors.category || errors.name
            toast.error(` ${error}`)

            return {
                ...state,
                createCategoryRequestStatus: 'fail',
            }
        }

        case UPDATE_CATEGORY_REQUEST: {
            return {
                ...state,
                updateCategoryRequestStatus: 'request',
                // categories: []
            }
        }

        case UPDATE_CATEGORY_SUCCESS: {
            toast.success(`Category updated`)

            return {
                ...state,
                updateCategoryRequestStatus: 'ok'
            }
        }

        case UPDATE_CATEGORY_FAIL: {

            const {errors} = action.payload.data;
            const error = errors.category || errors.name
            toast.error(` ${error}`)

            return {
                ...state,
                updateCategoryRequestStatus: 'fail',
            }
        }

        case DELETE_CATEGORY_REQUEST: {
            return {
                ...state,
                deleteCategoryRequestStatus: 'request',
                // categories: []
            }
        }

        case DELETE_CATEGORY_SUCCESS: {
            toast.success(`Category deleted`)
            return {
                ...state,
                deleteCategoryRequestStatus: 'ok'
            }
        }

        case DELETE_CATEGORY_FAIL: {
            return {
                ...state,
                deleteCategoryRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
