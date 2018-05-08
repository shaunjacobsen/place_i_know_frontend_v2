const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACCOMMODATIONS_START':
      return {
        ...state,
        loadingType: action.loadingType,
        loading: true,
        error: null,
      };
    case 'GET_ACCOMMODATIONS_SUCCESS':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: null,
        data: action.accommodations,
      };
    case 'GET_ACCOMMODATIONS_ERROR':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
