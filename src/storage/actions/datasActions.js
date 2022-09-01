export const DATA_ACTIONS = {
   FETCH_DATAS_GET_SUCCESS: 'FETCH_DATAS_GET_SUCCESS',
   FETCH_FAVORITES_GET_SUCCESS: 'FETCH_FAVORITES_GET_SUCCESS',
   FETCH_ERROR: 'DATA_ACTIONS.FETCH_ERROR',
   LOADING_START: 'LOADING_START',
   LOADING_END: 'LOADING_END',
   GOT_AN_ERROR: 'GOT_AN_ERROR',
   NEW_SEARCH_QUERY: 'NEW_SEARCH_QUERY'
}

export const fetchDatasGetSuccess = (data) => {
   return {
      type: DATA_ACTIONS.FETCH_DATAS_GET_SUCCESS,
      data
   }
}

export const gotAnError = (errorList) => {
   return {
      type: DATA_ACTIONS.GOT_AN_ERROR,
      errorList
   }
}

export const fetchFavoritesGetSuccess = (data) => {
   return {
      type: DATA_ACTIONS.FETCH_FAVORITES_GET_SUCCESS,
      data
   }
}

export const fetchError = () => {
   return {
      type: DATA_ACTIONS.FETCH_ERROR,
   }
}

export const loadingStart = () => {
   return {
      type: DATA_ACTIONS.LOADING_START,
   }
}

export const loadingEnd = () => {
   return {
      type: DATA_ACTIONS.LOADING_END,
   }
}

export const newSearchQuery = (searchQuery) => {
   return {
      type: DATA_ACTIONS.NEW_SEARCH_QUERY,
      searchQuery
   }
}

