import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    DELETE_FROM_CART_REQUEST,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_FAIL,
    CHANGE_CART_ITEM_QTY_REQUEST,
    CHANGE_CART_ITEM_QTY_SUCCESS,
    CHANGE_CART_ITEM_QTY_FAIL,
} from '../actions/cart';

import { USER_LOGOUT } from '../actions/users';
import { toast } from "react-toastify";

const initialState = {
    cart: {},
    cartList: [],
    productItemQty: 1,
    addToCartRequestStatus: '',
    changeCartItemQtyRequestStatus: '',
    getCartRequestStatus: '',
    deleteFromCartRequestStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_REQUEST: {
            return {
                ...state,
                addToCartRequestStatus: 'request',
            }
        }

        case ADD_TO_CART_SUCCESS: {
            const { cart } = action.payload.data;
            toast.success(`The product has been added to the cart`)

            return {
                ...state,
                cart,
                addToCartRequestStatus: 'ok'
            }
        }

        case ADD_TO_CART_FAIL: {
            const {errors} = action.payload.data;
            toast.error(` ${errors.cartItems}`)

            return {
                ...state,
                addToCartRequestStatus: 'fail',
            }
        }


        case CHANGE_CART_ITEM_QTY_REQUEST: {
            return {
                ...state,
                changeCartItemQtyRequestStatus: 'request',
            }
        }

        case CHANGE_CART_ITEM_QTY_SUCCESS: {
            const { cartItem, cart } = action.payload.data;

            return {
                ...state,
                cart,
                productItemQty: cartItem.quantity,
                changeCartItemQtyRequestStatus: 'ok'
            }
        }

        case CHANGE_CART_ITEM_QTY_FAIL: {
            return {
                ...state,
                changeCartItemQtyRequestStatus: 'fail',
            }
        }

        case GET_CART_REQUEST: {
            return {
                ...state,
                cartList: [],
                getCartRequestStatus: 'request',
            }
        }

        case GET_CART_SUCCESS: {
            const { cart, cartItems } = action.payload.data;

            return {
                ...state,
                cartList: cartItems,
                cart,
                getCartRequestStatus: 'ok'
            }
        }

        case GET_CART_FAIL: {
            return {
                ...state,
                cartList: [],
                getCartRequestStatus: 'fail',
            }
        }

        case DELETE_FROM_CART_REQUEST: {
            return {
                ...state,
                deleteFromCartRequestStatus: 'request',
            }
        }

        case DELETE_FROM_CART_SUCCESS: {
            const { cart } = action.payload.data;

            return {
                ...state,
                cart,
                deleteFromCartRequestStatus: 'ok'
            }
        }

        case DELETE_FROM_CART_FAIL: {
            return {
                ...state,
                deleteFromCartRequestStatus: 'fail',
            }
        }

        case USER_LOGOUT:
            return {
                ...state,
                cart: {}
            };

        default: {
            return {
                ...state
            }
        }
    }
}
