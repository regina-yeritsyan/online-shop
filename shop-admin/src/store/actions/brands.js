export const GET_BRANDS_REQUEST = 'GET_BRANDS_REQUEST';
export const GET_BRANDS_SUCCESS = 'GET_BRANDS_SUCCESS';
export const GET_BRANDS_FAIL = 'GET_BRANDS_FAIL';

export function getBrands() {
    return {
        type: GET_BRANDS_REQUEST,
        payload: {}
    }
}

export const CREATE_BRAND_REQUEST = 'CREATE_BRAND_REQUEST';
export const CREATE_BRAND_SUCCESS = 'CREATE_BRAND_SUCCESS';
export const CREATE_BRAND_FAIL = 'CREATE_BRAND_FAIL';

export function createBrand(name) {
    return {
        type: CREATE_BRAND_REQUEST,
        payload: {name}
    }
}

export const UPDATE_BRAND_REQUEST = 'UPDATE_BRAND_REQUEST';
export const UPDATE_BRAND_SUCCESS = 'UPDATE_BRAND_SUCCESS';
export const UPDATE_BRAND_FAIL = 'UPDATE_BRAND_FAIL';

export function updateBrand(name, id) {
    return {
        type: UPDATE_BRAND_REQUEST,
        payload: {name, id}
    }
}

export const DELETE_BRAND_REQUEST = 'DELETE_BRAND_REQUEST';
export const DELETE_BRAND_SUCCESS = 'DELETE_BRAND_SUCCESS';
export const DELETE_BRAND_FAIL = 'DELETE_BRAND_FAIL';

export function deleteBrand(id) {
    return {
        type: DELETE_BRAND_REQUEST,
        payload: {id}
    }
}