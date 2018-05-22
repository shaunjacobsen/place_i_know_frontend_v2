import axios from 'axios';
import accommodationGroups from '../reducers/accommodationGroups';

export const getAccommodationGroups = tripId => {
  return async (dispatch, getState) => {
    dispatch(getAccommodationGroupsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/accommodation_groups`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getAccommodationGroupsSuccess(data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getAccommodationGroupsError(e.response.status));
      } else {
        dispatch(getAccommodationGroupsError('NETWORK_ERROR'));
      }
    }
  };
};

export const getAccommodationGroupsStart = () => {
  return {
    type: 'GET_ACCOMMODATION_GROUPS_START',
  };
};

export const getAccommodationGroupsSuccess = accommodationGroups => {
  return {
    type: 'GET_ACCOMMODATION_GROUPS_SUCCESS',
    accommodationGroups,
  };
};

export const getAccommodationGroupsError = error => {
  return {
    type: 'GET_ACCOMMODATION_GROUPS_ERROR',
    error,
  };
};
