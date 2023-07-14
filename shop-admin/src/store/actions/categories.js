export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL';

export function getCategories() {
    return {
        type: GET_CATEGORIES_REQUEST,
        payload: {}
    }
}

export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAIL = 'CREATE_CATEGORY_FAIL';

export function createCategory(name) {
    return {
        type: CREATE_CATEGORY_REQUEST,
        payload: {name}
    }
}

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL';

export function updateCategory(name, id) {
    return {
        type: UPDATE_CATEGORY_REQUEST,
        payload: {name, id}
    }
}

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL';

export function deleteCategory(id) {
    return {
        type: DELETE_CATEGORY_REQUEST,
        payload: {id}
    }
}