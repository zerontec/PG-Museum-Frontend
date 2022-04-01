import { STORAGE_ARTWORK, STORAGE_FAVORITE } from "../types";

const initialState = {
  shop: [],
  favorites: []
}

export default function storageReducer(state = initialState, action) {
  switch (action.type) {
    case STORAGE_ARTWORK:

      for (let idx = 0; idx < state.shop.length; idx++) {
        if (state.shop[idx].id === action.payload.id) {
          const unselected = state.shop.filter(art => art.id !== action.payload.id)
          return {
            ...state,
            shop: unselected
          }
        }
      }

      return {
        ...state,
        shop: [...state.shop, action.payload]
      }
    case STORAGE_FAVORITE:
      for (let idx = 0; idx < state.favorites.length; idx++) {
        if (state.favorites[idx].id === action.payload.id) {
          const unselected = state.favorites.filter(art => art.id !== action.payload.id)
          return {
            ...state,
            favorites: unselected
          }
        }
      }

      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state
  }
}