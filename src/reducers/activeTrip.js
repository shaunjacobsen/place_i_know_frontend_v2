import itineraryReducer from './itinerary';
import itineraryDaysReducer from './itineraryDays';
import placesReducer from './places';
import eventsReducer from './events';
import accommodationGroupsReducer from './accommodationGroups';
import accommodationsReducer from './accommodations';
import documentGroupsReducer from './documentGroups';
import flightGroupsReducer from './flightGroups';
import flightsReducer from './flights';
import statementReducer from './statement';
import trainGroupsReducer from './trainGroups';
import trainsReducer from './trains';
import proposedItineraryReducer from './proposedItinerary';
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
    case 'SET_ITINERARY_ACTIVE_DATE':
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
    case 'GET_EVENTS_START':
      return {
        ...state,
        events: eventsReducer(state.events, action),
      };
    case 'GET_EVENTS_ERROR':
      return {
        ...state,
        events: eventsReducer(state.events, action),
      };
    case 'GET_EVENTS_SUCCESS':
      return {
        ...state,
        events: eventsReducer(state.events, action),
      };
    case 'GET_ACCOMMODATION_GROUPS_START':
      return {
        ...state,
        accommodationGroups: accommodationGroupsReducer(
          state.accommodationGroups,
          action
        ),
      };
    case 'GET_ACCOMMODATION_GROUPS_ERROR':
      return {
        ...state,
        accommodationGroups: accommodationGroupsReducer(
          state.accommodationGroups,
          action
        ),
      };
    case 'GET_ACCOMMODATION_GROUPS_SUCCESS':
      return {
        ...state,
        accommodationGroups: accommodationGroupsReducer(
          state.accommodationGroups,
          action
        ),
      };
    case 'GET_ACCOMMODATIONS_START':
      return {
        ...state,
        accommodations: accommodationsReducer(state.accommodations, action),
      };
    case 'GET_ACCOMMODATIONS_ERROR':
      return {
        ...state,
        accommodations: accommodationsReducer(state.accommodations, action),
      };
    case 'GET_ACCOMMODATIONS_SUCCESS':
      return {
        ...state,
        accommodations: accommodationsReducer(state.accommodations, action),
      };
    case 'ACCOMMODATION_SELECT_START':
      return {
        ...state,
        accommodationGroups: accommodationGroupsReducer(
          state.accommodationGroups,
          action
        ),
      };
    case 'ACCOMMODATION_SELECT_ERROR':
      return {
        ...state,
        accommodationGroups: accommodationGroupsReducer(
          state.accommodationGroups,
          action
        ),
      };
    case 'ACCOMMODATION_SELECT_SUCCESS':
      return {
        ...state,
        accommodationGroups: accommodationGroupsReducer(
          state.accommodationGroups,
          action
        ),
      };
    case 'GET_FLIGHT_GROUPS_START':
      return {
        ...state,
        flightGroups: flightGroupsReducer(state.flightGroups, action),
      };
    case 'GET_FLIGHT_GROUPS_ERROR':
      return {
        ...state,
        flightGroups: flightGroupsReducer(state.flightGroups, action),
      };
    case 'GET_FLIGHT_GROUPS_SUCCESS':
      return {
        ...state,
        flightGroups: flightGroupsReducer(state.flightGroups, action),
      };
    case 'GET_FLIGHTS_START':
      return {
        ...state,
        flights: flightsReducer(state.flights, action),
      };
    case 'GET_FLIGHTS_ERROR':
      return {
        ...state,
        flights: flightsReducer(state.flights, action),
      };
    case 'GET_FLIGHTS_SUCCESS':
      return {
        ...state,
        flights: flightsReducer(state.flights, action),
      };
    case 'FLIGHT_SELECT_START':
      return {
        ...state,
        flightGroups: flightGroupsReducer(state.flightGroups, action),
      };
    case 'FLIGHT_SELECT_ERROR':
      return {
        ...state,
        flightGroups: flightGroupsReducer(state.flightGroups, action),
      };
    case 'FLIGHT_SELECT_SUCCESS':
      return {
        ...state,
        flightGroups: flightGroupsReducer(state.flightGroups, action),
      };
    case 'GET_TRAIN_GROUPS_START':
      return {
        ...state,
        trainGroups: trainGroupsReducer(state.trainGroups, action),
      };
    case 'GET_TRAIN_GROUPS_ERROR':
      return {
        ...state,
        trainGroups: trainGroupsReducer(state.trainGroups, action),
      };
    case 'GET_TRAIN_GROUPS_SUCCESS':
      return {
        ...state,
        trainGroups: trainGroupsReducer(state.trainGroups, action),
      };
    case 'GET_TRAINS_START':
      return {
        ...state,
        trains: trainsReducer(state.trains, action),
      };
    case 'GET_TRAINS_ERROR':
      return {
        ...state,
        trains: trainsReducer(state.trains, action),
      };
    case 'GET_TRAINS_SUCCESS':
      return {
        ...state,
        trains: trainsReducer(state.trains, action),
      };
    case 'TRAIN_SELECT_START':
      return {
        ...state,
        trainGroups: trainGroupsReducer(state.trainGroups, action),
      };
    case 'TRAIN_SELECT_ERROR':
      return {
        ...state,
        trainGroups: trainGroupsReducer(state.trainGroups, action),
      };
    case 'TRAIN_SELECT_SUCCESS':
      return {
        ...state,
        trainGroups: trainGroupsReducer(state.trainGroups, action),
      };
    case 'GET_DOCUMENT_GROUPS_START':
      return {
        ...state,
        documentGroups: documentGroupsReducer(state.documentGroups, action),
      };
    case 'GET_DOCUMENT_GROUPS_ERROR':
      return {
        ...state,
        documentGroups: documentGroupsReducer(state.documentGroups, action),
      };
    case 'GET_DOCUMENT_GROUPS_SUCCESS':
      return {
        ...state,
        documentGroups: documentGroupsReducer(state.documentGroups, action),
      };
    case 'GET_CHARGES_START':
      return {
        ...state,
        charges: statementReducer(state.charges, action),
      };
    case 'GET_CHARGES_ERROR':
      return {
        ...state,
        charges: statementReducer(state.charges, action),
      };
    case 'GET_CHARGES_SUCCESS':
      return {
        ...state,
        charges: statementReducer(state.charges, action),
      };
    case 'GET_PROPOSED_ITINERARIES_START':
      return {
        ...state,
        proposedItineraries: proposedItineraryReducer(state.proposedItineraries, action),
      };
    case 'GET_PROPOSED_ITINERARIES_ERROR':
      return {
        ...state,
        proposedItineraries: proposedItineraryReducer(state.proposedItineraries, action),
      };
    case 'GET_PROPOSED_ITINERARIES_SUCCESS':
      return {
        ...state,
        proposedItineraries: proposedItineraryReducer(state.proposedItineraries, action),
      };
    default:
      return state;
  }
};
