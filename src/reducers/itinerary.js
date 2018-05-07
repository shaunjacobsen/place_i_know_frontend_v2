const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITINERARY_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ITINERARY_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.itinerary,
      };
    case 'GET_ITINERARY_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'SET_ITINERARY_ACTIVE_DATE':
    return {
      ...state,
      activeDate: action.date,
    }
    default:
      return state;
  }
};
