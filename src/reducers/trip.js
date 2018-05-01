const initialTripState = [];

export default (state = initialTripState, action) => {
  switch (action.type) {
    case 'GET_TRIPS_START':
      return {
        ...state,
        loading: true,
        error: null,
        trips: action.trips,
      };
    case 'GET_TRIPS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        trips: action.trips,
      };
    case 'GET_TRIPS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
        trips: [],
      };
    default:
      return state;
  }
};
