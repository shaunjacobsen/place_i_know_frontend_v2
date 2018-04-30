import axios from 'axios';
import { store } from './../index';

export const signIn = user => {
  return {
    type: 'SIGN_IN',
    user,
  };
};

export const startSignIn = data => {
  return async () => {    
    try {
      const request = await axios.post('//localhost:9292/signin', data);
      if (request.status === 200) {
        const user = request.data;
        console.log(user);
        store.dispatch(signIn(user));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const startSignOut = () => {
  return () => {
    store.dispatch(signOut());
  };
};
