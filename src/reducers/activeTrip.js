const initialTripState = [];

export default (state = initialTripState, action) => {
  switch (action.type) {
    case 'RESET_ACTIVE_TRIP':
      return {
        trip: {},
        itinerary: {},
        proposedItineraries: [],
        bookings: {},
        statementCharges: [],
      };
    case 'SET_ACTIVE_TRIP':
      return {
        trip: action.trip,
        itinerary: {},
        proposedItineraries: [],
        bookings: {},
        statementCharges: [],
      };
    case 'GET_ITINERARY_DATES_START':
      return {
        ...state,
        itinerary: {
          loading: true,
          error: null,
          dates: {},
        },
      };
    case 'GET_ITINERARY_DATES_SUCCESS':
      return {
        ...state,
        itinerary: {
          loading: false,
          error: null,
          dates: action.itineraryDates,
        },
      };
    case 'GET_ITINERARY_DATES_ERROR':
      return {
        ...state,
        itinerary: {
          loading: false,
          error: action.error,
          dates: {},
        },
      };
    case 'GET_ITINERARY_EVENTS_FOR_DATE_START':
      return {
        ...state,
        itinerary: {
          loading: true,
          error: null,
          activeDate: action.date,
        },
      };
    case 'GET_ITINERARY_EVENTS_FOR_DATE_SUCCESS':
      return {
        ...state,
        itinerary: {
          loading: false,
          error: null,
          dates: {
            ...state.itinerary.dates,
            [action.date]: action.events,
          },
        },
      };
    case 'GET_ITINERARY_EVENTS_FOR_DATE_ERROR':
      return {
        ...state,
        itinerary: {
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
