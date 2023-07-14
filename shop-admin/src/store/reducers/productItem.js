import {
    GET_PRODUCT_ITEM_REQUEST,
    GET_PRODUCT_ITEM_SUCCESS,
    GET_PRODUCT_ITEM_FAIL,
    CREATE_PRODUCT_ITEM_REQUEST,
    CREATE_PRODUCT_ITEM_SUCCESS,
    CREATE_PRODUCT_ITEM_FAIL,
    UPDATE_PRODUCT_ITEM_REQUEST,
    UPDATE_PRODUCT_ITEM_SUCCESS,
    UPDATE_PRODUCT_ITEM_FAIL,
    DELETE_PRODUCT_ITEM_REQUEST,
    DELETE_PRODUCT_ITEM_SUCCESS,
    DELETE_PRODUCT_ITEM_FAIL

} from "../actions/productItem";
import { toast } from "react-toastify";

const initialState = {
    productItems: [],
    productItemRequestStatus: '',
    createProductItemReqStatus: '',
    updateProductItemReqStatus: '',
    deleteProductItemReqStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                productItemRequestStatus: 'request',
            }
        }

        case GET_PRODUCT_ITEM_SUCCESS: {

            const { products } = action.payload.data;
            return {
                ...state,
                productItems: products,
                productItemRequestStatus: 'ok',

            }
        }

        case GET_PRODUCT_ITEM_FAIL: {
            return {
                ...state,
                productItemRequestStatus: 'fail',

            }
        }

        case CREATE_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                createProductItemReqStatus: 'request',
            }
        }

        case CREATE_PRODUCT_ITEM_SUCCESS: {
            toast.success(`Product item created`);
            return {
                ...state,
                createProductItemReqStatus: 'ok',

            }
        }

        case CREATE_PRODUCT_ITEM_FAIL: {

            const {errors, message} = action.payload.data;
            const error = errors?.productItem || message
            toast.error(error)

            return {
                ...state,
                createProductItemReqStatus: 'fail',
            }
        }

        case UPDATE_PRODUCT_ITEM_REQUEST: {

            return {
                ...state,
                updateProductItemReqStatus: 'request',
            }
        }

        case UPDATE_PRODUCT_ITEM_SUCCESS: {
            toast.success(`Product item updated`);
            return {
                ...state,
                updateProductItemReqStatus: 'ok',

            }
        }

        case UPDATE_PRODUCT_ITEM_FAIL: {

            const {errors, message} = action.payload.data;
            const error = errors?.productItem || message
            toast.error(error)

            return {
                ...state,
                updateProductItemReqStatus: 'fail',

            }
        }

        case DELETE_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                deleteProductItemReqStatus: 'request',
            }
        }

        case DELETE_PRODUCT_ITEM_SUCCESS: {
            toast.success(`Product item deleted`)
            return {
                ...state,
                deleteProductItemReqStatus: 'ok',

            }
        }

        case DELETE_PRODUCT_ITEM_FAIL: {
            return {
                ...state,
                deleteProductItemReqStatus: 'fail',

            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}