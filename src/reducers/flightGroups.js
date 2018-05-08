const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FLIGHT_GROUPS_START':
      return {
        ...state,
        loadingType: action.loadingType,
        loading: true,
        error: null,
      };
    case 'GET_FLIGHT_GROUPS_SUCCESS':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: null,
        data: action.flightGroups,
      };
    case 'GET_FLIGHT_GROUPS_ERROR':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
