import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS   ,
    GET_PRODUCTS_LIST_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from "../actions/products";

import { toast } from "react-toastify";

const initialState = {
    productsList: [],
    product: {},
    products: [],
    total_product: undefined,
    productsListRequestStatus: '',
    createProductRequestStatus: '',
    updateProductRequestStatus: '',
    deleteProductRequestStatus: '',
    oneProductRequestStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LIST_REQUEST: {
            return {
                ...state,
                productsListRequestStatus: 'request',
                // productsList: []
            }
        }

        case GET_PRODUCTS_LIST_SUCCESS: {
            const { products, total, per_page } = action.payload.data

            return {
                ...state,
                productsList: products,
                total_product: Math.ceil(total / per_page),
                productsListRequestStatus: 'ok'
            }
        }

        case GET_PRODUCTS_LIST_FAIL: {
            return {
                ...state,
                productsListRequestStatus: 'fail',
            }
        }

        case CREATE_PRODUCT_REQUEST: {
            return {
                ...state,
                createProductRequestStatus: 'request',
            }
        }

        case CREATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                createProductRequestStatus: 'ok'
            }
        }

        case CREATE_PRODUCT_FAIL: {

            const {errors, message} = action.payload.data;
            const error = errors?.product || message
            toast.error(error)

            return {
                ...state,
                createProductRequestStatus: 'fail',
            }
        }

        case UPDATE_PRODUCT_REQUEST: {
            return {
                ...state,
                updateProductRequestStatus: 'request',
            }
        }

        case UPDATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                updateProductRequestStatus: 'ok'
            }
        }

        case UPDATE_PRODUCT_FAIL: {

            const {errors, message} = action.payload.data;
            const error = errors?.product || message
            toast.error(error)

            return {
                ...state,
                updateProductRequestStatus: 'fail',
            }
        }

        case DELETE_PRODUCT_REQUEST: {
            return {
                ...state,
                deleteProductRequestStatus: 'request',
            }
        }

        case DELETE_PRODUCT_SUCCESS: {
            toast.success(`Product deleted`)
            return {
                ...state,
                deleteProductRequestStatus: 'ok'
            }
        }

        case DELETE_PRODUCT_FAIL: {
            return {
                ...state,
                deleteProductRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
