import axios from 'axios';

export const getCharges = tripId => {
  return async (dispatch, getState) => {
    const authToken = getState().auth.token;
    dispatch(getChargesStart());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/charges`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (response.status === 200) {
        dispatch(getChargesSuccess(response.data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getChargesError(e.response.status));
      } else {
        dispatch(getChargesError('NETWORK_ERROR'));
      }
    }
  };
};

export const getChargesStart = () => {
  return {
    type: 'GET_CHARGES_START',
  };
};

export const getChargesSuccess = charges => {
  return {
    type: 'GET_CHARGES_SUCCESS',
    charges,
  };
};

export const getChargesError = error => {
  return {
    type: 'GET_CHARGES_ERROR',
    error,
  };
};
