const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLACES_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_PLACES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.places,
      };
    case 'GET_PLACES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
