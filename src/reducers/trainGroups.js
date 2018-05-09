const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TRAIN_GROUPS_START':
      return {
        ...state,
        loadingType: action.loadingType,
        loading: true,
        error: null,
      };
    case 'GET_TRAIN_GROUPS_SUCCESS':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: null,
        data: action.trainGroups,
      };
    case 'GET_TRAIN_GROUPS_ERROR':
      return {
        ...state,
        loadingType: null,
        loading: false,
        error: action.error,
      };
    case 'TRAIN_SELECT_START':
      return {
        ...state,
        error: null,
      };
    case 'TRAIN_SELECT_SUCCESS':
      return {
        ...state,
        data: action.trainGroups,
      };
    case 'TRAIN_SELECT_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
