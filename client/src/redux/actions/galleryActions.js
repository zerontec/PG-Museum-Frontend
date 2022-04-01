import { GET_ALL_GALLERY, GET_FIND_GALLERY, FILTER_SORT_GALLERY, TYPES_GALLERY, GET_GALLERY_ID } from '../types'
import axios from 'axios'
const url = process.env.REACT_APP_URL

//fetches the list of artworks - recibe la lista de piezas de arte
export const getAllGallery = () => {
    return async function dispatch(dispatch) {
        const response = await fetch(`${url}/artwork/all`);
        const json = await response.json();
        dispatch({
            type: GET_ALL_GALLERY,
            payload: json
        });
    }
}

// export const getGalleryById = (id) => {
//     return async function dispatch(dispatch) {
//         const response = await fetch(`${url}/artwork/${id}`);
//         const json = await response.json();

//         dispatch({
//             type: GET_GALLERY_ID,
//             payload: json
//         });
//     }
// }

//searches artwork by name - busca pieza de arte por nombre
export const getFindGallery = (input) => {
    return async function dispatch(dispatch) {
        const response = await fetch(`${url}/artwork/name?name=${input}`);
        const json = await response.json();
        dispatch({
            type: GET_FIND_GALLERY,
            payload: json
        });
    }
}

export function categoriesTypes() {
    return async function dispatch(dispatch) {
        const response = await axios.get(`${url}/types`);
        const json = await response.data;
        dispatch({
            type: TYPES_GALLERY,
            payload: json
        });
    }
}

export function filterAndSort(category, sort) {
    return function (dispatch) {
        dispatch({
            type: FILTER_SORT_GALLERY,
            payload: {category, sort}
        });
    }
}