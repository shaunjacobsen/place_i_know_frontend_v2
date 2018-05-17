import React from 'react';
import { Avatar, Badge, Tooltip } from 'antd';

export class ChatRoomOption extends React.Component {
  determineActiveClass() {
    return this.props.active ? 'chat__contact active' : 'chat__contact';
  }

  unreads = (user, room, messages = {}) => {
    const read = user.readCursor({ roomId: room.id });
    return (
      (read && Object.keys(messages).filter(message => message > read.position).length) ||
      undefined
    );
  };

  render() {
    console.log(this.props.messages);
    const unreadCount = this.unreads(
      this.props.currentUser,
      this.props.room,
      this.props.messages[this.props.room.id]
    );
    return (
      <div
        className={this.determineActiveClass()}
        onClick={e => this.props.handleClick(e, this.props.room.id)}
      >
        <div className="chat__contact__details">
          <div className="chat__contact-avatar">
            {this.props.room.users.map(user => {
              return (
                <div>
                  <Tooltip
                    title={this.props.currentUser.id === user.id ? 'You' : user.name}
                    key={user.id}
                  >
                    <Badge
                      status={user.presence.state === 'online' ? 'success' : 'default'}
                    >
                      <Avatar
                        shape="square"
                        size="small"
                        src={user.avatarURL}
                        key={user.id}
                      />
                    </Badge>
                  </Tooltip>
                </div>
              );
            })}
          </div>
          <div className="chat__contact-room-title">{this.props.room.name}</div>
        </div>

        <div className="chat__contact-unread-count">
          {this.props.room.id !== this.props.currentRoom.id && unreadCount ? (
            <Badge count={unreadCount} />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default ChatRoomOption;
