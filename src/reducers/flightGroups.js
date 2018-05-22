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
    case 'FLIGHT_SELECT_START':
      return {
        ...state,
        selectError: null,
      };
    case 'FLIGHT_SELECT_SUCCESS':
      return {
        ...state,
        data: action.flightGroups,
      };
    case 'FLIGHT_SELECT_ERROR':
      return {
        ...state,
        selectError: action.error,
      };
    default:
      return state;
  }
};
