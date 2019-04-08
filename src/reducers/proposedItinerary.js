const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROPOSED_ITINERARIES_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_PROPOSED_ITINERARIES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.proposedItineraries,
      };
    case 'GET_PROPOSED_ITINERARIES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
