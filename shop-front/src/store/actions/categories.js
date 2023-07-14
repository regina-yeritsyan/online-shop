export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL';

export function getCategories() {
    return {
        type: GET_CATEGORIES_REQUEST,
        payload: {}
    }
}

export const GET_COLORS_REQUEST = 'GET_COLORS_REQUEST';
export const GET_COLORS_SUCCESS = 'GET_COLORS_SUCCESS';
export const GET_COLORS_FAIL = 'GET_COLORS_FAIL';

export function getColors() {
    return {
        type: GET_COLORS_REQUEST,
        payload: {}
    }
}
