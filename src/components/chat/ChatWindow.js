import React from 'react';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit';
import { Icon, Spin } from 'antd';
import ChatRoom from './ChatRoom';
import ActiveRoomHeader from './ActiveRoomHeader';
import ConversationPane from './ConversationPane';
import ComposeMessage from './ComposeMessage';

export class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
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
              },
            })
            .then(currentRoom => {
              this.setState(() => ({
                currentRoom,
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
    }));
    this.state.currentUser
      .subscribeToRoom({
        roomId: data,
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
        },
      })
      .then(currentRoom => {
        this.setState(() => ({
          currentRoom,
        }));
      });
  };

  handleMessageSend = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    });
  };

  render() {
    return (
      <div className="chat">
        <div className="chat__contacts">
          {this.state.currentUser.rooms !== undefined &&
            this.state.currentUser.rooms.map(room => {
              return (
                <ChatRoom
                  active={room.id === this.state.currentRoom.id}
                  key={room.id}
                  room={room}
                  currentUser={this.state.currentUser}
                  handleClick={this.handleRoomSelection}
                />
              );
            })}
        </div>
        <div className="chat__conversation">
          {this.state.currentRoom.users !== undefined && (
            <ActiveRoomHeader
              room={this.state.currentRoom}
              currentUserId={this.state.currentUser.id}
            />
          )}

          <ConversationPane
            roomId={this.state.currentRoom.id}
            chat={this.state.currentUser}
            messages={this.state.messages}
          />
          <ComposeMessage
            roomId={this.state.currentRoom.id}
            chat={this.state.currentUser}
            onSubmit={this.handleMessageSend}
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
