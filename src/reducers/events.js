const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_EVENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.events,
      };
    case 'GET_EVENTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
