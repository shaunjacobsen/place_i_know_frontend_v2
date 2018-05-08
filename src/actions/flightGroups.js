import axios from 'axios';
import flightGroups from '../reducers/flightGroups';

export const getFlightGroups = tripId => {
  return async (dispatch, getState) => {
    dispatch(getFlightGroupsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/flight_groups`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getFlightGroupsSuccess(data));
      }
    } catch (e) {
      dispatch(getFlightGroupsError());
    }
  };
};

export const getFlightGroupsStart = () => {
  return {
    type: 'GET_FLIGHT_GROUPS_START',
  };
};

export const getFlightGroupsSuccess = flightGroups => {
  return {
    type: 'GET_FLIGHT_GROUPS_SUCCESS',
    flightGroups,
  };
};

export const getFlightGroupsError = error => {
  return {
    type: 'GET_FLIGHT_GROUPS_ERROR',
    error,
  };
};
