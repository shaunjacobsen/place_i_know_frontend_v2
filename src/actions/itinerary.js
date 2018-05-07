import axios from 'axios';

// export const getItinerary = tripId => {
//   return async (dispatch, getState) => {
//     dispatch(getItineraryStart());
//     try {
//       const authToken = getState().auth.token;
//       const request = await axios.get(
//         `${process.env.REACT_APP_API_URL}/trip/${tripId}/itineraries`,
//         {
//           headers: { 'x-auth': authToken },
//         }
//       );
//       if (request.status === 200) {
//         // for now, there is support for only one active itinerary per trip.
//         // therefore, we only get the first result from the server.
//         const itinerary = request.data[0];
//         dispatch(getItinerarySuccess(itinerary));
//       }
//     } catch (e) {
//       dispatch(getItineraryError(e));
//     }
//   };
// };

export const getItinerary = tripId => {
  return (dispatch, getState) => {
    const authToken = getState().auth.token;
    dispatch(getItineraryStart());
    return axios
      .get(`${process.env.REACT_APP_API_URL}/trip/${tripId}/itineraries`, {
        headers: { 'x-auth': authToken },
      })
      .then(response => dispatch(getItinerarySuccess(response.data[0])));
  };
};

export const getItineraryStart = () => {
  return {
    type: 'GET_ITINERARY_START',
  };
};

export const getItinerarySuccess = itinerary => {
  return {
    type: 'GET_ITINERARY_SUCCESS',
    itinerary,
  };
};

export const getItineraryError = error => {
  return {
    type: 'GET_ITINERARY_ERROR',
    error,
  };
};

export const setItineraryActiveDate = date => {
  return {
    type: 'SET_ITINERARY_ACTIVE_DATE',
    date,
  };
};
