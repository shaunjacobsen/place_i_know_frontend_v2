const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITINERARY_DAYS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ITINERARY_DAYS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.itineraryDays,
      };
    case 'GET_ITINERARY_DAYS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'GET_ITINERARY_DATE_RANGE_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ITINERARY_DATE_RANGE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        dateRange: action.dateRange,
      };
    case 'GET_ITINERARY_DATE_RANGE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
