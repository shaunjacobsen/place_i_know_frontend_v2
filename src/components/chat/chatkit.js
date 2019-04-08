import Chatkit from '@pusher/chatkit-client';

export default ({ state, actions }, { id, token }) =>
  new Chatkit.ChatManager({
    tokenProvider: new Chatkit.TokenProvider({
      url: `${process.env.REACT_APP_API_URL}/chat/authenticate`,
      headers: { 'x-auth': token },
    }),
    instanceLocator: process.env.REACT_APP_PUSHER_INSTANCE,
    userId: String(id),
  })
    .connect({
      onUserStartedTyping: actions.isTyping,
      onUserStoppedTyping: actions.notTyping,
      onAddedToRoom: actions.subscribeToRoom,
      onUserCameOnline: actions.setUserPresence,
      onUserWentOffline: actions.setUserPresence,
    })
    .then(user => {
      Promise.all(
        user.rooms.map(room =>
          user.subscribeToRoom({
            roomId: room.id,
            hooks: { onNewMessage: actions.addMessage },
          })
        )
      ).then(rooms => {
        actions.setUser(user);
        user.rooms.length > 0 && actions.joinRoom(user.rooms[0]);
      });
    })
    .catch(error => console.log('Error connecting to chat', error));
