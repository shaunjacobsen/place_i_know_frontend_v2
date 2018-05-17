import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Chatkit from '@pusher/chatkit';
import { Icon, Spin } from 'antd';
import ChatRoomOption from './ChatRoomOption';
import ActiveRoomHeader from './ActiveRoomHeader';
import ConversationPane from './ConversationPane';
import ComposeMessage from './ComposeMessage';
import TypingIndicator from './TypingIndicator';

export class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersTyping: [],
      loadingRoom: true,
    };
  }

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
        this.setState(() => ({
          currentUser,
        }));
        if (currentUser.rooms.length > 0) {
          currentUser
            .subscribeToRoom({
              roomId: currentUser.rooms[0].id,
              messageLimit: 50,
              hooks: {
                onNewMessage: message => {
                  this.setState(prevState => ({
                    messages: [
                      ...prevState.messages,
                      {
                        id: message.id,
                        created: message.createdAt,
                        sender: message.sender,
                        text: message.text,
                      },
                    ],
                  }));
                },
                onUserCameOnline: () => this.forceUpdate(),
                onUserWentOffline: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate(),
              },
            })
            .then(currentRoom => {
              this.setState(() => ({
                currentRoom,
                loadingRoom: false,
              }));
            });
        }
      })
      .catch(e => console.log(e));
  }

  handleRoomSelection = (e, data) => {
    const existingSubscriptionToRoom = this.state.currentUser.roomSubscriptions[
      this.state.currentRoom.id
    ];
    if (existingSubscriptionToRoom) {
      existingSubscriptionToRoom.cancel();
    }
    this.setState(() => ({
      messages: [],
      currentRoom: {},
      loadingRoom: true,
    }));
    this.state.currentUser
      .subscribeToRoom({
        roomId: data,
        messageLimit: 50,
        hooks: {
          onNewMessage: this.addMessage,
          onUserStartedTyping: user => {
            this.setState(prevState => ({
              usersTyping: [prevState.usersTyping, user.name],
            }));
          },
          onUserStoppedTyping: user => {
            this.setState(prevState => ({
              usersTyping: prevState.usersTyping.filter(
                username => username !== user.name
              ),
            }));
          },
        },
      })
      .then(currentRoom => {
        this.setState(() => ({
          currentRoom,
          loadingRoom: false,
        }));
      });
  };

  addMessage = message => {
    const roomId = message.room.id;
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        {
          id: message.id,
          created: message.createdAt,
          sender: message.sender,
          text: message.text,
        },
      ],
    }));
    if (roomId === this.state.currentRoom.id) {
      const cursor = this.state.currentUser.readCursor({ roomId }) || {};
      const cursorPosition = cursor.position || 0;
      cursorPosition < message.id && this.setCursor(roomId, message.id);
      this.scrollToEnd();
    }
  };

  handleMessageSend = text => {
    this.state.currentUser
      .sendMessage({
        text,
        roomId: this.state.currentRoom.id,
      })
      .then(async messageId => {
        const request = axios.post(
          `${process.env.REACT_APP_API_URL}/chat/room/${
            this.state.currentRoom.id
          }/message`,
          {
            pusher_message_id: messageId,
            body: text,
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
  };

  setCursor = (roomId, messageId) => {
    this.state.currentUser
      .setReadCursor({ roomId, position: parseInt(messageId) })
      .then(async x => {
        const request = axios.post(
          `${
            process.env.REACT_APP_API_URL
          }/chat/room/${roomId}/message/${messageId}/mark_read`,
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
  };

  scrollToEnd = (e) => {
    setTimeout(() => {
      const element = document.querySelector('.chat__conversation__list');
      element && (element.scrollTop = 10000000);
    })
  };

  handleTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({
        roomId: this.state.currentRoom.id,
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="chat">
        <div className="chat__contacts">
          {this.state.currentUser.rooms !== undefined &&
            this.state.currentUser.rooms.map(room => {
              return (
                <ChatRoomOption
                  active={room.id === this.state.currentRoom.id}
                  key={room.id}
                  room={room}
                  messages={this.state.messages}
                  currentUser={this.state.currentUser}
                  currentRoom={this.state.currentRoom}
                  handleClick={this.handleRoomSelection}
                />
              );
            })}
        </div>
        <div className="chat__conversation">
          <ActiveRoomHeader
            room={this.state.currentRoom}
            currentUserId={this.state.currentUser.id}
            loading={this.state.loadingRoom}
          />
          <ConversationPane
            roomId={this.state.currentRoom.id}
            chat={this.state.currentUser}
            messages={this.state.messages}
            loading={this.state.loadingRoom}
          />
          <ComposeMessage
            roomId={this.state.currentRoom.id}
            chat={this.state.currentUser}
            onSubmit={this.handleMessageSend}
            loading={this.state.loadingRoom}
            usersTyping={this.state.usersTyping}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps)(ChatWindow);
