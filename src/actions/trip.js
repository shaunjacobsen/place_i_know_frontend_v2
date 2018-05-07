import axios from 'axios';
import { store } from './../index';

export const getTripsStart = () => {
  return {
    type: 'GET_TRIPS_START',
    error: null,
    loading: true,
  };
};

export const getTripsSuccess = trips => {
  return {
    type: 'GET_TRIPS_SUCCESS',
    trips,
  };
};

export const getTripsError = error => {
  return {
    type: 'GET_TRIPS_ERROR',
    error,
  };
};

export const getTrips = () => {
  return async (dispatch, getState) => {
    dispatch(getTripsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(`${process.env.REACT_APP_API_URL}/trip`, {
        headers: { 'x-auth': authToken },
      });
      if (request.status === 200) {
        const trips = request.data;
        dispatch(getTripsSuccess(trips));
      }
    } catch (e) {
      dispatch(getTripsError('error'));
    }
  };
};