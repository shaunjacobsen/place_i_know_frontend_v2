export const chatConnected = currentUser => {
  return {
    type: 'CHAT_CONNECTED',
    currentUser,
  };
};

export const chatNewMessage = (roomId, message) => {
  return {
    type: 'CHAT_NEW_MESSAGE',
    roomId,
    message,
  };
};

export const chatSetActiveRoom = (roomId) => {
  return {
    type: 'CHAT_SET_ACTIVE_ROOM',
    roomId,
  };
};
