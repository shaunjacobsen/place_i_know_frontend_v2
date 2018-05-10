const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DOCUMENT_GROUPS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_DOCUMENT_GROUPS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.documentGroups,
      };
    case 'GET_DOCUMENT_GROUPS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
