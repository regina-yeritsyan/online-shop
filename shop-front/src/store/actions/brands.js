export const GET_BRANDS_REQUEST = 'GET_BRANDS_REQUEST';
export const GET_BRANDS_SUCCESS = 'GET_BRANDS_SUCCESS';
export const GET_BRANDS_FAIL = 'GET_BRANDS_FAIL';

export function getBrands() {
    return {
        type: GET_BRANDS_REQUEST,
        payload: {}
    }
}
