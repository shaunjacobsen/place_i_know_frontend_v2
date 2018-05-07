import itineraryReducer from './itinerary';
import itineraryDaysReducer from './itineraryDays';
import placesReducer from './places';
const initialTripState = [];

export default (state = initialTripState, action) => {
  switch (action.type) {
    case 'RESET_ACTIVE_TRIP':
      return {};
    case 'SET_ACTIVE_TRIP':
      return action.trip;
    case 'GET_ACTIVE_TRIP_ASSOCIATED_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ACTIVE_TRIP_ASSOCIATED_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'GET_ACTIVE_TRIP_ASSOCIATED_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'GET_ITINERARY_START':
      return {
        ...state,
        itinerary: itineraryReducer(state.itinerary, action),
      };
    case 'GET_ITINERARY_ERROR':
      return {
        ...state,
        itinerary: itineraryReducer(state.itinerary, action),
      };
    case 'GET_ITINERARY_SUCCESS':
      return {
        ...state,
        itinerary: itineraryReducer(state.itinerary, action),
      };
    case 'GET_ITINERARY_DAYS_START':
      return {
        ...state,
        itineraryDays: itineraryDaysReducer(state.itineraryDays, action),
      };
    case 'GET_ITINERARY_DAYS_ERROR':
      return {
        ...state,
        itineraryDays: itineraryDaysReducer(state.itineraryDays, action),
      };
    case 'GET_ITINERARY_DAYS_SUCCESS':
      return {
        ...state,
        itineraryDays: itineraryDaysReducer(state.itineraryDays, action),
      };
    case 'GET_PLACES_START':
      return {
        ...state,
        places: placesReducer(state.places, action),
      };
    case 'GET_PLACES_ERROR':
      return {
        ...state,
        places: placesReducer(state.places, action),
      };
    case 'GET_PLACES_SUCCESS':
      return {
        ...state,
        places: placesReducer(state.places, action),
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
          ...state.itinerary,
          loading: true,
          error: null,
          activeDate: action.date,
        },
      };
    case 'GET_ITINERARY_EVENTS_FOR_DATE_SUCCESS':
      return {
        ...state,
        itinerary: {
          ...state.itinerary,
          activeDate: action.date,
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
          ...state.itinerary,
          loading: false,
          error: action.error,
        },
      };
    case 'GET_ITINERARY_ACCOMMODATIONS_START':
      return {
        ...state,
        bookings: {
          ...state.bookings,
          accommodations: {
            ...state.bookings.accommodations,
            loading: true,
            error: null,
            groups: [],
          },
        },
      };
    case 'GET_ITINERARY_ACCOMMODATIONS_SUCCESS':
      return {
        ...state,
        bookings: {
          ...state.bookings,
          accommodations: {
            ...state.bookings.accommodations,
            loading: false,
            error: null,
            groups: action.accommodations,
            groupStatus: {
              loading: false,
              error: null,
            },
          },
        },
      };
    case 'GET_ITINERARY_ACCOMMODATIONS_ERROR':
      return {
        ...state,
        bookings: {
          ...state.bookings,
          accommodations: {
            ...state.bookings.accommodations,
            loading: false,
            error: action.error,
            groups: [],
          },
        },
      };
    case 'ACCOMMODATION_SELECT_START':
      return {
        ...state,
        bookings: {
          ...state.bookings,
          accommodations: {
            groupStatus: {
              loading: true,
              error: null,
            },
            groups: [...state.bookings.accommodations.groups],
          },
        },
      };
    case 'ACCOMMODATION_SELECT_SUCCESS':
      return {
        ...state,
        bookings: {
          ...state.bookings,
          accommodations: {
            groupStatus: {
              loading: false,
              error: null,
            },
            groups: action.accommodations,
          },
        },
      };
    case 'ACCOMMODATION_SELECT_ERROR':
      return {
        ...state,
        bookings: {
          ...state.bookings,
          accommodations: {
            groupStatus: {
              loading: false,
              error: action.error,
            },
            groups: [...state.bookings.accommodations.groups],
          },
        },
      };
    default:
      return state;
  }
};
