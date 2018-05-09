const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TRAINS_START':
      return {
        ...state,
        loadingType: action.loadingType,
        loading: true,
        error: null,
      };
    case 'GET_TRAINS_SUCCESS':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: null,
        data: action.trains,
      };
    case 'GET_TRAINS_ERROR':
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
