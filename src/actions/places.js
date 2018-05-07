import axios from 'axios';

export const getPlaces = tripId => {
  return async (dispatch, getState) => {
    dispatch(getPlacesStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/places`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getPlacesSuccess(data));
      }
    } catch (e) {
      dispatch(getPlacesError(e));
    }
  };
};

export const getPlacesStart = () => {
  return {
    type: 'GET_PLACES_START',
  };
};

export const getPlacesSuccess = places => {
  return {
    type: 'GET_PLACES_SUCCESS',
    places,
  };
};

export const getPlacesError = error => {
  return {
    type: 'GET_PLACES_ERROR',
    error,
  };
};
