import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { set, del } from 'object-path-immutable';
import { Spin, Icon } from 'antd';
import RoomList from './RoomList';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import RoomHeader from './RoomHeader';
import CreateMessageForm from './CreateMessageForm';
import ChatManager from './chatkit';

export class ChatPage extends React.Component {
  state = {
    user: {},
    room: {},
    messages: {},
    typing: {},
  };

  actions = {
    setUser: user => this.setState({ user }),

    setRoom: room => {
      this.setState({ room });
      this.actions.scrollToEnd();
    },

    joinRoom: room => {
      this.actions.setRoom(room);
      this.actions.subscribeToRoom(room);
      this.state.messages[room.id] &&
        this.actions.setCursor(room.id, Object.keys(this.state.messages[room.id]).pop());
    },

    subscribeToRoom: room => {
      !this.state.user.roomSubscriptions[room.id] &&
        this.state.user.subscribeToRoom({
          roomId: room.id,
          hooks: { onNewMessage: this.actions.addMessage },
        });
    },

    setCursor: (roomId, cursorPosition) => {
      this.state.user
        .setReadCursor({ roomId, position: parseInt(cursorPosition) })
        .then(async () => {
          const request = axios.post(
            `${
              process.env.REACT_APP_API_URL
            }/chat/room/${roomId}/message/${cursorPosition}/mark_read`,
            {},
            {
              headers: {
                'x-auth': this.props.user.token,
              },
            }
          );
          if (request.status === 200) {
          }
        });
    },

    addMessage: payload => {
      const roomId = payload.room.id;
      const messageId = payload.id;
      this.setState(set(this.state, ['messages', roomId, messageId], payload));
      if (roomId === this.state.room.id) {
        const cursor = this.state.user.readCursor({ roomId }) || {};
        const cursorPosition = cursor.position || 0;
        cursorPosition < messageId && this.actions.setCursor(roomId, messageId);
        this.actions.scrollToEnd();
      }
    },

    handleSendMessage: message => {
      this.state.user
        .sendMessage({
          text: message,
          roomId: this.state.room.id,
        })
        .then(async messageId => {
          const request = axios.post(
            `${process.env.REACT_APP_API_URL}/chat/room/${this.state.room.id}/message`,
            {
              pusher_message_id: messageId,
              body: message,
            },
            {
              headers: {
                'x-auth': this.props.user.token,
              },
            }
          );
          if (request.status === 200) {
          }
        });
    },

    scrollToEnd: e =>
      setTimeout(() => {
        const elem = document.querySelector('#messages');
        elem && (elem.scrollTop = 100000);
      }, 0),

    isTyping: (room, user) =>
      this.setState(set(this.state, ['typing', room.id, user.name], true)),

    notTyping: (room, user) =>
      this.setState(del(this.state, ['typing', room.id, user.name])),

    setUserPresence: () => this.forceUpdate(),
  };

  componentDidMount() {
    ChatManager(this, {
      id: this.props.user.user.profileId,
      token: this.props.user.token,
    });
  }

  render() {
    const { user, room, messages, typing, sidebarOpen, userListOpen } = this.state;
    if (user.id) {
      return (
        <div className="chat">
          <div className="chat__contacts">
            <RoomList
              user={user}
              rooms={user.rooms}
              messages={messages}
              typing={typing}
              current={room}
              actions={this.actions}
            />
          </div>
          {room.id ? (
            <div className="chat__conversation">
              <RoomHeader state={this.state} />
              <MessageList user={user} messages={messages[room.id]} />
              <TypingIndicator typing={typing[room.id]} />
              <CreateMessageForm state={this.state} actions={this.actions} />
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="chat">
        <Spin indicator={<Icon type="loading" spin />} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps)(ChatPage);
