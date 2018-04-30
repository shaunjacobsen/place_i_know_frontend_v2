export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        user: action.user,
      };
    case 'SIGN_OUT':
      return {};
    default:
      return state;
  }
};
