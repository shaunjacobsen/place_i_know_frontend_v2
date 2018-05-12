const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHARGES_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_CHARGES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.charges,
      };
    case 'GET_CHARGES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
