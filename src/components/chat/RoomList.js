import React from 'react';
import { Avatar, Badge, Tooltip } from 'antd';

const unreads = (user, room, messages = {}) => {
  const read = user.readCursor({ roomId: room.id });
  return (
    (read && Object.keys(messages).filter(x => x > read.position).length) || undefined
  );
};

const priority = (user, room, messages = {}) => {
  const unreadMessages = unreads(user, room, messages) || 0;
  const lastMessage = Object.keys(messages).pop() || 0;
  return (10 * unreadMessages + parseInt(lastMessage)) * -1;
};

export const RoomList = ({ rooms = [], user, messages, current, typing, actions }) =>
  rooms.map(room => {
    const messageKeys = Object.keys(messages[room.id] || {});
    const latestMessage = messageKeys.length > 0 && messages[room.id][messageKeys.pop()];
    const firstUser = room.users.find(x => x.id !== user.id);
    const order = priority(user, room, messages[room.id]);
    const unreadCount = unreads(user, room, messages[room.id]);
    return (
      <div className="chat__contact">
        <div
          key={room.id}
          disabled={room.id === current.id}
          onClick={e => actions.joinRoom(room)}
          className="chat__contact__details"
        >
          <div className="chat__contact-avatar">
            {room.users.map(roomUser => {
              return (
                <div>
                  <Tooltip
                    title={user.id === roomUser.id ? 'You' : roomUser.name}
                    key={roomUser.id}
                  >
                    <Badge
                      status={
                        roomUser.presence.state === 'online' ? 'success' : 'default'
                      }
                    >
                      <Avatar
                        shape="square"
                        size="small"
                        src={roomUser.avatarURL}
                        key={roomUser.id}
                      />
                    </Badge>
                  </Tooltip>
                </div>
              );
            })}
          </div>
          <div className="chat__contact-room-title">{room.name}</div>
          <span>{latestMessage && latestMessage.text}</span>
          {room.id !== current.id && unreadCount ? (
            <div className="chat__contact-unread-count">
              {this.props.room.id !== this.props.currentRoom.id && unreadCount ? (
                <Badge count={unreadCount} />
              ) : (
                <div />
              )}
            </div>
          ) : Object.keys(typing[room.id] || {}).length > 0 ? (
            <div className="chat__dots">{[0, 1, 2].map(x => <div key={x} />)}</div>
          ) : null}
        </div>
      </div>
    );
  });

export default RoomList;
