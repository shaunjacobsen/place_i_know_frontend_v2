import axios from 'axios';
import { store } from './../index';
import { mapLoadPoints } from './map';

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

export const getItineraryDates = () => {
  return async (dispatch, getState) => {
    dispatch(getItineraryDatesStart());
    try {
      const authToken = getState().auth.token;
      const itineraryId = getState().activeTrip.trip.itineraries[0].itinerary_id;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}/dates`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const itinerary = request.data;
        dispatch(getItineraryDatesSuccess(itinerary));
      }
    } catch (e) {
      dispatch(getItineraryDatesError('error'));
    }
  };
};

export const getItineraryDatesStart = () => {
  return {
    type: 'GET_ITINERARY_DATES_START',
  };
};

export const getItineraryDatesSuccess = itineraryDates => {
  return {
    type: 'GET_ITINERARY_DATES_SUCCESS',
    itineraryDates: itineraryDates.reduce((result, item, index, array) => {
      result[item] = [];
      return result;
    }, {}),
  };
};

export const getItineraryDatesError = error => {
  return {
    type: 'GET_ITINERARY_DATES_ERROR',
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
      dispatch(getItineraryEventsForDateError('error'));
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

export const accommodationMarkSelected = id => {
  return async (dispatch, getState) => {
    dispatch(accommodationMarkSelectedStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/accommodation/${id}/select`,
        {},
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(accommodationMarkSelectedSuccess(data));
      }
    } catch (e) {
      dispatch(accommodationMarkSelectedError());
    }
  };
};

export const accommodationMarkSelectedStart = () => {
  return {
    type: 'ACCOMMODATION_SELECT_START',
  };
};
export const accommodationMarkSelectedSuccess = accommodations => {
  return {
    type: 'ACCOMMODATION_SELECT_SUCCESS',
    accommodations,
  };
};

export const accommodationMarkSelectedError = error => {
  return {
    type: 'ACCOMMODATION_SELECT_ERROR',
    error,
  };
};
