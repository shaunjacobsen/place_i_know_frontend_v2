const initialState = {
  currentUser: {},
  global: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT_CONNECTED':
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case 'CHAT_SET_ACTIVE_ROOM':
      let globalState = state.global;
      globalState.activeRoom = action.roomId;
      return {
        ...state,
        global: globalState,
      };
    default:
      return state;
  }
};
