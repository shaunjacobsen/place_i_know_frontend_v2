const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FLIGHTS_START':
      return {
        ...state,
        loadingType: action.loadingType,
        loading: true,
        error: null,
      };
    case 'GET_FLIGHTS_SUCCESS':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: null,
        data: action.flights,
      };
    case 'GET_FLIGHTS_ERROR':
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
