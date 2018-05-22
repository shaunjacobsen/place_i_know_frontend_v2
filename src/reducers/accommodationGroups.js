const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACCOMMODATION_GROUPS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ACCOMMODATION_GROUPS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.accommodationGroups,
      };
    case 'GET_ACCOMMODATION_GROUPS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'ACCOMMODATION_SELECT_START':
      return {
        ...state,
        selectError: null,
      };
    case 'ACCOMMODATION_SELECT_SUCCESS':
      return {
        ...state,
        data: action.accommodationGroups,
      };
    case 'ACCOMMODATION_SELECT_ERROR':
      return {
        ...state,
        selectError: action.error,
      };
    default:
      return state;
  }
};
