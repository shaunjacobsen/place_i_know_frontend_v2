import axios from 'axios';

export const getProposedItineraries = tripId => {
  return async (dispatch, getState) => {
    dispatch(getProposedItinerariesStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/proposed_itineraries`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getProposedItinerariesSuccess(data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getProposedItinerariesError(e.response.status));
        return Promise.reject();
      } else {
        dispatch(getProposedItinerariesError('NETWORK_ERROR'));
        return Promise.reject();
      }
    }
  };
};

export const getProposedItinerariesStart = () => {
  return {
    type: 'GET_PROPOSED_ITINERARIES_START',
  };
};

export const getProposedItinerariesSuccess = data => {
  return {
    type: 'GET_PROPOSED_ITINERARIES_SUCCESS',
    proposedItineraries: data,
  };
};

export const getProposedItinerariesError = error => {
  return {
    type: 'GET_PROPOSED_ITINERARIES_ERROR',
    error,
  };
};
