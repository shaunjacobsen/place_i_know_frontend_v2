export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SIGN_IN_SUCCESS':
      return {
        user: action.user,
        token: action.authToken,
        loading: false,
        error: null,
      };
    case 'SIGN_IN_ERROR':
      return {
        user: null,
        token: null,
        loading: false,
        error: action.error,
      };
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};
