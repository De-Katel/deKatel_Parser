import { DATA_ACTIONS } from "../actions/datasActions";

const initialState = {
   searchData: [],
   favorites: [],
   isError: false,
   isLoading: false,
   errorList: [],
   searchQuery: ''
}

const datasReducer = (state = initialState, action) => {
   switch (action.type) {
      case DATA_ACTIONS.FETCH_DATAS_GET_SUCCESS:
         return {
            ...state,
            searchData: action.data
         }
      case DATA_ACTIONS.FETCH_FAVORITES_GET_SUCCESS:
         return {
            ...state,
            favorites: action.data
         }
      case DATA_ACTIONS.FETCH_ERROR:
         return {
            ...state,
            isError: !state.isError,
         }
      case DATA_ACTIONS.LOADING_START:
         return {
            ...state,
            isLoading: true
         }
      case DATA_ACTIONS.LOADING_END:
         return {
            ...state,
            isLoading: false
         }
      case DATA_ACTIONS.GOT_AN_ERROR:
         return {
            ...state,
            errorList: action.errorList
         }
      case DATA_ACTIONS.NEW_SEARCH_QUERY:
         return {
            ...state,
            searchQuery: action.searchQuery
         }
      default: return state;
   };
}

export default datasReducer;