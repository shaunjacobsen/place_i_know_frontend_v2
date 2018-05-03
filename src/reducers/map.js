export default (state = {}, action) => {
  switch (action.type) {
    case 'MAP_SET_BOUNDS':
      return {
        ...state,
        bounds: action.bounds,
      };
    case 'MAP_SET_POINTS':
      return {
        ...state,
        points: action.points,
      };
    default:
      return state;
  }
};
