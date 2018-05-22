import axios from 'axios';

export const signIn = data => {
  return async dispatch => {
    dispatch(signInStart());
    try {
      const request = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, data);
      if (request.status === 200) {
        const user = request.data;
        const authToken = request.headers['x-auth'];
        localStorage.setItem('authKey', authToken);
        dispatch(signInSuccess(user, authToken));
      }
    } catch (e) {
      if (e.response) {
        dispatch(signInError(e.response.status));
      } else {
        dispatch(signInError('NETWORK_ERROR'));
      }
    }
  };
};

export const signInStart = () => {
  return {
    type: 'SIGN_IN_START',
  };
};
export const signInSuccess = (user, authToken) => {
  return {
    type: 'SIGN_IN_SUCCESS',
    user,
    authToken,
  };
};

export const signInError = error => {
  return {
    type: 'SIGN_IN_ERROR',
    error,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const startSignOut = () => {
  return async dispatch => {
    try {
      const activeAuthToken = localStorage.getItem('authKey');
      const request = await axios.post(`${process.env.REACT_APP_API_URL}/signout`, {
        token: activeAuthToken,
      });
      if (request.status === 200) {
        localStorage.clear();
        dispatch(signOut());
      }
    } catch (e) {
      console.log(e);
    }
  };
};
