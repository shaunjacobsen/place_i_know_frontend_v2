import axios from 'axios';

export const getItineraryDays = itineraryId => {
  return async (dispatch, getState) => {
    dispatch(getItineraryDaysStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}/days`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getItineraryDaysSuccess(data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getItineraryDaysError(e.response.status));
        return Promise.reject();
      } else {
        dispatch(getItineraryDaysError('NETWORK_ERROR'));
        return Promise.reject();
      }
    }
  };
};

export const getItineraryDaysStart = () => {
  return {
    type: 'GET_ITINERARY_DAYS_START',
  };
};

export const getItineraryDaysSuccess = itineraryDays => {
  return {
    type: 'GET_ITINERARY_DAYS_SUCCESS',
    itineraryDays,
  };
};

export const getItineraryDaysError = error => {
  return {
    type: 'GET_ITINERARY_DAYS_ERROR',
    error,
  };
};

export const getItineraryDateRange = itineraryId => {
  return async (dispatch, getState) => {
    dispatch(getItineraryDateRangeStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}/dates`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getItineraryDateRangeSuccess(data));
      }
    } catch (e) {
      dispatch(getItineraryDateRangeError(e));
    }
  };
};

export const getItineraryDateRangeStart = () => {
  return {
    type: 'GET_ITINERARY_DATE_RANGE_START',
  };
};

export const getItineraryDateRangeSuccess = dateRange => {
  return {
    type: 'GET_ITINERARY_DATE_RANGE_SUCCESS',
    dateRange,
  };
};

export const getItineraryDateRangeError = error => {
  return {
    type: 'GET_ITINERARY_DATE_RANGE_ERROR',
    error,
  };
};