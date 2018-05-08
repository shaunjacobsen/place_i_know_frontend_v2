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

export const getAccommodations = (tripId, loadingType = 'initial') => {
  return async (dispatch, getState) => {
    dispatch(getAccommodationsStart(loadingType));
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

export const getAccommodationsStart = loadingType => {
  return {
    type: 'GET_ACCOMMODATIONS_START',
    loadingType,
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
        dispatch(getAccommodations(getState().activeTrip.trip_id, 'refresh'));
      } else if (request.status === 401) {
        dispatch(accommodationMarkSelectedError('Unauthorized'));
      } else if (request.status === 400) {
        dispatch(
          accommodationMarkSelectedError(
            'Could not mark hotel as selected. Please try again or chat with your travel planner.'
          )
        );
      }
    } catch (e) {
      dispatch(
        accommodationMarkSelectedError({
          title: 'Error Selecting Hotel',
          message:
            "There's been an issue selecting that hotel. Please try again or contact your travel planner.",
        })
      );
    }
  };
};

export const accommodationMarkSelectedStart = () => {
  return {
    type: 'ACCOMMODATION_SELECT_START',
  };
};
export const accommodationMarkSelectedSuccess = accommodationGroups => {
  return {
    type: 'ACCOMMODATION_SELECT_SUCCESS',
    accommodationGroups,
  };
};

export const accommodationMarkSelectedError = error => {
  return {
    type: 'ACCOMMODATION_SELECT_ERROR',
    error,
  };
};
