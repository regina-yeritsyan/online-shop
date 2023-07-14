import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS   ,
    GET_PRODUCTS_LIST_FAIL,
    GET_ONE_PRODUCT_REQUEST,
    GET_ONE_PRODUCT_SUCCESS,
    GET_ONE_PRODUCT_FAIL,
    CREATE_PRODUCT_RATING_REQUEST,
    CREATE_PRODUCT_RATING_SUCCESS,
    CREATE_PRODUCT_RATING_FAIL,

} from "../actions/products";

const initialState = {
    productsList: [],
    total_pages: undefined,
    product: {},
    products: [],
    productsListRequestStatus: '',
    createProductRatingRequestStatus: '',
    oneProductRequestStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LIST_REQUEST: {
            return {
                ...state,
                productsListRequestStatus: 'request',
                productsList: []
            }
        }

        case GET_PRODUCTS_LIST_SUCCESS: {
            const { products, total, per_page } = action.payload.data

            return {
                ...state,
                productsList: products,
                total_pages: Math.ceil(total / per_page),
                productsListRequestStatus: 'ok'
            }
        }

        case GET_PRODUCTS_LIST_FAIL: {
            return {
                ...state,
                productsListRequestStatus: 'fail',
            }
        }

        case GET_ONE_PRODUCT_REQUEST: {
            return {
                ...state,
                product: {},
                oneProductRequestStatus: 'request',
            }
        }

        case GET_ONE_PRODUCT_SUCCESS: {
            const { product, products } = action.payload.data

            return {
                ...state,
                product,
                products,
                oneProductRequestStatus: 'ok'
            }
        }

        case GET_ONE_PRODUCT_FAIL: {
            return {
                ...state,
                oneProductRequestStatus: 'fail',
            }
        }

        case CREATE_PRODUCT_RATING_REQUEST: {
            return {
                ...state,
                createProductRatingRequestStatus: 'request',
            }
        }

        case CREATE_PRODUCT_RATING_SUCCESS: {
            return {
                ...state,
                createProductRatingRequestStatus: 'ok'
            }
        }

        case CREATE_PRODUCT_RATING_FAIL: {
            return {
                ...state,
                createProductRatingRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
