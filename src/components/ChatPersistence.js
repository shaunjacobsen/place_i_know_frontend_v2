// The purpose of ChatPersistence is to keep the client connected to chat
// no matter where they are when signed in

import React from 'react';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit';
import { chatConnected, chatNewMessage } from './../actions/chat';

export class ChatPersistence extends React.Component {
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_PUSHER_INSTANCE,
      userId: String(this.props.user.user.profileId),
      tokenProvider: new Chatkit.TokenProvider({
        url: `${process.env.REACT_APP_API_URL}/chat/authenticate`,
        queryParams: {},
        headers: {
          'x-auth': this.props.user.token,
        },
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.props.setCurrentUserInStore(currentUser);
        if (currentUser.rooms.length > 0) {
          currentUser.subscribeToRoom({
            roomId: currentUser.rooms[0].id,
            messageLimit: 50,
            hooks: {
              onNewMessage: message => {
                this.props.logNewMessage(currentUser.rooms[0].id, message);
              },
            },
          });
        }
      })
      .catch(e => console.log(e));
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUserInStore: currentUser => dispatch(chatConnected(currentUser)),
  logNewMessage: (roomId, message) => dispatch(chatNewMessage(roomId, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPersistence);
