import axios from 'axios';
import flights from '../reducers/flights';
import { getFlightGroups } from './flightGroups';

export const getActiveTripFlightData = tripId => {
  return dispatch => {
    dispatch(getActiveTripFlightDataStart());
    Promise.all([
      dispatch(getFlightGroups(tripId)),
      dispatch(getFlights(tripId)),
    ]).then(() => dispatch(getActiveTripFlightDataSuccess()));
  };
};

export const getActiveTripFlightDataStart = () => {
  return {
    type: 'GET_ACTIVE_TRIP_FLIGHTS_START',
  };
};

export const getActiveTripFlightDataSuccess = () => {
  return {
    type: 'GET_ACTIVE_TRIP_FLIGHTS_SUCCESS',
  };
};

export const getActiveTripFlightDataError = error => {
  return {
    type: 'GET_ACTIVE_TRIP_FLIGHTS_ERROR',
    error,
  };
};

export const getFlights = (tripId, loadingType = 'initial') => {
  return async (dispatch, getState) => {
    dispatch(getFlightsStart(loadingType));
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/flights`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getFlightsSuccess(data));
      }
    } catch (e) {
      dispatch(getFlightsError(e));
    }
  };
};

export const getFlightsStart = loadingType => {
  return {
    type: 'GET_ACCOMMODATIONS_START',
    loadingType,
  };
};

export const getFlightsSuccess = flights => {
  return {
    type: 'GET_FLIGHTS_SUCCESS',
    flights,
  };
};

export const getFlightsError = error => {
  return {
    type: 'GET_FLIGHTS_ERROR',
    error,
  };
};