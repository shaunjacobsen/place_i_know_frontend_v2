import axios from 'axios';
import documentGroups from '../reducers/documentGroups';

export const getDocumentGroups = tripId => {
  return async (dispatch, getState) => {
    dispatch(getDocumentGroupsStart());
    try {
      const authToken = getState().auth.token;
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${tripId}/document_groups`,
        {
          headers: { 'x-auth': authToken },
        }
      );
      if (request.status === 200) {
        const data = request.data;
        dispatch(getDocumentGroupsSuccess(data));
      }
    } catch (e) {
      if (e.response) {
        dispatch(getDocumentGroupsError(e.response.status));
      } else {
        dispatch(getDocumentGroupsError('NETWORK_ERROR'));
      }
    }
  };
};

export const getDocumentGroupsStart = () => {
  return {
    type: 'GET_DOCUMENT_GROUPS_START',
  };
};

export const getDocumentGroupsSuccess = documentGroups => {
  return {
    type: 'GET_DOCUMENT_GROUPS_SUCCESS',
    documentGroups,
  };
};

export const getDocumentGroupsError = error => {
  return {
    type: 'GET_DOCUMENT_GROUPS_ERROR',
    error,
  };
};
