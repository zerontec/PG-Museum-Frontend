import { STORAGE_ARTWORK, STORAGE_FAVORITE} from "../types"

export function storageShop(storage) {
  console.log(storage)
  return {
    type: STORAGE_ARTWORK,
    payload: storage
  }
}

export function storageFavorites(storage) {
  return {
    type: STORAGE_FAVORITE,
    payload: storage
  }
}