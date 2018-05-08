import axios from 'axios';
import accommodations from '../reducers/accommodations';
import { getAccommodationGroups } from './accommodationGroups';

export const getActiveTripAccommodationsData = tripId => {
  return dispatch => {
    dispatch(getActiveTripAccommodationsDataStart());
    Promise.all([
      dispatch(getAccommodationGroups(tripId)),
      dispatch(getAccommodations(tripId)),
    ]).then(() => dispatch(getActiveTripAccommodationsDataSuccess()));
  };
};

export const getActiveTripAccommodationsDataStart = () => {
  return {
    type: 'GET_ACTIVE_TRIP_ACCOMMODATIONS_START',
  };
};

export const getActiveTripAccommodationsDataSuccess = () => {
  return {
    type: 'GET_ACTIVE_TRIP_ACCOMMODATIONS_SUCCESS',
  };
};

export const getActiveTripAccommodationsDataError = error => {
  return {
    type: 'GET_ACTIVE_TRIP_ACCOMMODATIONS_ERROR',
    error,
  };
};

export const getAccommodations = tripId => {
  return async (dispatch, getState) => {
    dispatch(getAccommodationsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/accommodations`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getAccommodationsSuccess(data));
      }
    } catch (e) {
      dispatch(getAccommodationsError(e));
    }
  };
};

export const getAccommodationsStart = () => {
  return {
    type: 'GET_ACCOMMODATIONS_START',
  };
};

export const getAccommodationsSuccess = accommodations => {
  return {
    type: 'GET_ACCOMMODATIONS_SUCCESS',
    accommodations,
  };
};

export const getAccommodationsError = error => {
  return {
    type: 'GET_ACCOMMODATIONS_ERROR',
    error,
  };
};
