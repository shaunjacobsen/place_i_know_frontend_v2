import axios from 'axios';
import trains from '../reducers/trains';
import { getTrainGroups } from './trainGroups';

export const getActiveTripTrainData = tripId => {
  return dispatch => {
    dispatch(getActiveTripTrainDataStart());
    Promise.all([dispatch(getTrainGroups(tripId)), dispatch(getTrains(tripId))])
      .then(() => dispatch(getActiveTripTrainDataSuccess()))
      .catch(() => dispatch(getActiveTripTrainDataError('ERROR')));
  };
};

export const getActiveTripTrainDataStart = () => {
  return {
    type: 'GET_ACTIVE_TRIP_TRAINS_START',
  };
};

export const getActiveTripTrainDataSuccess = () => {
  return {
    type: 'GET_ACTIVE_TRIP_TRAINS_SUCCESS',
  };
};

export const getActiveTripTrainDataError = error => {
  return {
    type: 'GET_ACTIVE_TRIP_TRAINS_ERROR',
    error,
  };
};

export const getTrains = (tripId, loadingType = 'initial') => {
  return async (dispatch, getState) => {
    dispatch(getTrainsStart(loadingType));
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/trains`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getTrainsSuccess(data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getTrainsError(e.response.status));
      } else {
        dispatch(getTrainsError('NETWORK_ERROR'));
      }
    }
  };
};

export const getTrainsStart = loadingType => {
  return {
    type: 'GET_TRAINS_START',
    loadingType,
  };
};

export const getTrainsSuccess = trains => {
  return {
    type: 'GET_TRAINS_SUCCESS',
    trains,
  };
};

export const getTrainsError = error => {
  return {
    type: 'GET_TRAINS_ERROR',
    error,
  };
};

export const trainMarkSelected = id => {
  return async (dispatch, getState) => {
    dispatch(trainMarkSelectedStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/train/${id}/select`,
        {},
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(trainMarkSelectedSuccess(data));
        dispatch(getTrains(getState().activeTrip.trip_id, 'refresh'));
      } else if (request.status === 401) {
        dispatch(trainMarkSelectedError('Unauthorized'));
      } else if (request.status === 400) {
        dispatch(
          trainMarkSelectedError({
            title: 'Error Selecting Train/Bus',
            message:
              "There's been an issue selecting that train. Please try again or chat with your travel planner.",
          })
        );
      }
    } catch (e) {
      dispatch(
        trainMarkSelectedError({
          title: 'Error Selecting Train/Bus',
          message:
            "There's been an issue selecting that train/bus. Please try again or contact your travel planner.",
        })
      );
    }
  };
};

export const trainMarkSelectedStart = () => {
  return {
    type: 'TRAIN_SELECT_START',
  };
};

export const trainMarkSelectedSuccess = trainGroups => {
  return {
    type: 'TRAIN_SELECT_SUCCESS',
    trainGroups,
  };
};

export const trainMarkSelectedError = error => {
  return {
    type: 'TRAIN_SELECT_ERROR',
    error,
  };
};
