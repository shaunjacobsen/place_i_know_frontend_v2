import axios from 'axios';

export const getItinerary = tripId => {
  return (dispatch, getState) => {
    const authToken = getState().auth.token;
    dispatch(getItineraryStart());
    return axios
      .get(`${process.env.REACT_APP_API_URL}/trip/${tripId}/itineraries`, {
        headers: { 'x-auth': authToken },
      })
      .then(response => dispatch(getItinerarySuccess(response.data[0])));
  };
};

export const getItineraryStart = () => {
  return {
    type: 'GET_ITINERARY_START',
  };
};

export const getItinerarySuccess = itinerary => {
  return {
    type: 'GET_ITINERARY_SUCCESS',
    itinerary,
  };
};

export const getItineraryError = error => {
  return {
    type: 'GET_ITINERARY_ERROR',
    error,
  };
};

export const setItineraryActiveDate = date => {
  return {
    type: 'SET_ITINERARY_ACTIVE_DATE',
    date,
  };
};
