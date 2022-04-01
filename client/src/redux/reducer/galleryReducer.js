import { GET_ALL_GALLERY, GET_FIND_GALLERY, FILTER_SORT_GALLERY, TYPES_GALLERY} from '../types'

const initialState = {
  allGallery: [],
  filteredGallery: []
}

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ALL_GALLERY:
      return {
        ...state,
        allGallery: action.payload
      }
    case GET_FIND_GALLERY:
      return {
        ...state,
        allGallery: action.payload
      }
    case TYPES_GALLERY:
      return {
        ...state,
        types: action.payload
      }

    case FILTER_SORT_GALLERY:

      let filterSort;

      if (action.payload.category && !action.payload.sort) {
        filterSort = state.allGallery.filter(art => {
          if (art && art.types && art.types[0]) {
            return art.types[0]?.type.toLowerCase().includes(action.payload.category.toLowerCase())
          }
        })
      } else if (!action.payload.category && action.payload.sort) {
        switch (action.payload.sort) {
          case 'AtoZ':
            filterSort = state.allGallery.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
              return 0
            })
            break; 

          case 'ZtoA':
            filterSort = state.allGallery.sort((a, b) => {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
              return 0
            })
          break;
          default: 
          break;
        }
      } else if (action.payload.category && action.payload.sort) {
        switch (action.payload.sort) {
          case 'AtoZ':
            let filterGalleyASC = state.allGallery.filter(art => {
              if (art && art.types && art.types[0]) {
                return art.types[0]?.type.toLowerCase().includes(action.payload.category.toLowerCase())
              }
            })
            filterSort = filterGalleyASC.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
              return 0
            })
            break; 

          case 'ZtoA':
            let filterGalleyDESC = state.allGallery.filter(art => {
              if (art && art.types && art.types[0]) {
                return art.types[0]?.type.toLowerCase().includes(action.payload.category.toLowerCase())
              }
            })
            filterSort = filterGalleyDESC.sort((a, b) => {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
              return 0
            })
          break;
          default: 
          break;
        }
      } else {
        filterSort = []
      }

      return {
        ...state,
        filteredGallery: filterSort
      }
      
    default:
      return state;
  }
}