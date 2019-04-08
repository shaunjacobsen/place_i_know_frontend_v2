import axios from 'axios';
import { mapLoadPoints } from './map';
import { getPlaces } from './places';
import { getItinerary, getItineraryError } from './itinerary';
import { getItineraryDays } from './itineraryDays';
import { getEvents } from './events';
import { getProposedItineraries } from './proposedItinerary';

export const resetActiveTrip = () => {
  return {
    type: 'RESET_ACTIVE_TRIP',
  };
};

export const setActiveTrip = trip => {
  return {
    type: 'SET_ACTIVE_TRIP',
    trip,
  };
};

export const getActiveTripAssociatedData = tripId => {
  return dispatch => {
    dispatch(getActiveTripAssociatedDataStart());
    dispatch(getItinerary(tripId))
      .then(response => {
        Promise.all([
          dispatch(getItineraryDays(response.itinerary.itinerary_id)),
          dispatch(getEvents(response.itinerary.itinerary_id)),
          dispatch(getPlaces(tripId)),
          dispatch(getProposedItineraries(tripId)),
        ])
          .then(() => dispatch(getActiveTripAssociatedDataSuccess()))
          .catch(() => dispatch(getActiveTripAssociatedDataError('ERROR')));
      })
      .catch(() => dispatch(getItineraryError('ERROR')));
  };
};

export const getActiveTripAssociatedDataStart = () => {
  return {
    type: 'GET_ACTIVE_TRIP_ASSOCIATED_DATA_START',
  };
};

export const getActiveTripAssociatedDataSuccess = () => {
  return {
    type: 'GET_ACTIVE_TRIP_ASSOCIATED_DATA_SUCCESS',
  };
};

export const getActiveTripAssociatedDataError = error => {
  return {
    type: 'GET_ACTIVE_TRIP_ASSOCIATED_DATA_ERROR',
    error,
  };
};

export const getItineraryEventsForDate = date => {
  return async (dispatch, getState) => {
    dispatch(getItineraryEventsForDateStart(date));
    try {
      const authToken = getState().auth.token;
      const itineraryId = getState().activeTrip.trip.itineraries[0].itinerary_id;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}/events?date=${date}`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const events = request.data;
        dispatch(getItineraryEventsForDateSuccess(date, events));
        // TODO: move mapLoadPoints() to another part of the app to prevent side effects
        dispatch(mapLoadPoints());
      }
    } catch (e) {
      dispatch(getItineraryEventsForDateError(e));
    }
  };
};

export const getItineraryEventsForDateStart = date => {
  return {
    type: 'GET_ITINERARY_EVENTS_FOR_DATE_START',
    date,
  };
};

export const getItineraryEventsForDateSuccess = (date, events) => {
  return {
    type: 'GET_ITINERARY_EVENTS_FOR_DATE_SUCCESS',
    date,
    events,
  };
};

export const getItineraryEventsForDateError = error => {
  return {
    type: 'GET_ITINERARY_EVENTS_FOR_DATE_ERROR',
    error,
  };
};

export const getItineraryAccommodations = () => {
  return async (dispatch, getState) => {
    dispatch(getItineraryAccommodationsStart());
    try {
      const authToken = getState().auth.token;
      const tripId = getState().activeTrip.trip.trip_id;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/accommodations`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const accommodations = request.data;
        dispatch(getItineraryAccommodationsSuccess(accommodations));
      }
    } catch (e) {
      dispatch(getItineraryAccommodationsError('error'));
    }
  };
};

export const getItineraryAccommodationsStart = () => {
  return {
    type: 'GET_ITINERARY_ACCOMMODATIONS_START',
  };
};

export const getItineraryAccommodationsSuccess = accommodations => {
  return {
    type: 'GET_ITINERARY_ACCOMMODATIONS_SUCCESS',
    accommodations,
  };
};

export const getItineraryAccommodationsError = error => {
  return {
    type: 'GET_ITINERARY_ACCOMMODATIONS_ERROR',
    error,
  };
};
