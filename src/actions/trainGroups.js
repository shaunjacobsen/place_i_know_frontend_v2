import axios from 'axios';
import trainGroups from '../reducers/trainGroups';

export const getTrainGroups = tripId => {
  return async (dispatch, getState) => {
    dispatch(getTrainGroupsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/train_groups`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getTrainGroupsSuccess(data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getTrainGroupsError(e.response.status));
      } else {
        dispatch(getTrainGroupsError('NETWORK_ERROR'));
      }
    }
  };
};

export const getTrainGroupsStart = () => {
  return {
    type: 'GET_TRAIN_GROUPS_START',
  };
};

export const getTrainGroupsSuccess = trainGroups => {
  return {
    type: 'GET_TRAIN_GROUPS_SUCCESS',
    trainGroups,
  };
};

export const getTrainGroupsError = error => {
  return {
    type: 'GET_TRAIN_GROUPS_ERROR',
    error,
  };
};
