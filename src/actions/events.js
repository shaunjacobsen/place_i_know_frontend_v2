import axios from 'axios';

export const getEvents = itineraryId => {
  return async (dispatch, getState) => {
    dispatch(getEventsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}/events`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getEventsSuccess(data));
      }
    } catch (e) {
      dispatch(getEventsError(e));
    }
  };
};

export const getEventsStart = () => {
  return {
    type: 'GET_EVENTS_START',
  };
};

export const getEventsSuccess = events => {
  return {
    type: 'GET_EVENTS_SUCCESS',
    events,
  };
};

export const getEventsError = error => {
  return {
    type: 'GET_EVENTS_ERROR',
    error,
  };
};
