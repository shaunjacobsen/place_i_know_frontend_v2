import axios from 'axios';

export const login = uid => {
  return {
    type: 'LOGIN',
    uid,
  };
};

export const startLogin = () => {
  return () => {
    return {};
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const startLogout = () => {
  return () => {
    return {};
  };
};
