import React from 'react';
import { Avatar, Tooltip } from 'antd';

export const RoomHeader = ({ state: { room, user, sidebarOpen, userListOpen } }) => (
  <div className="chat__conversation__header">
    <h2>{room.name}</h2>
    <div className="users">
      {room.users.map(roomUser => {
        return (
          <Tooltip
            title={user.id === roomUser.id ? 'You' : roomUser.name}
            key={roomUser.id}
          >
            <Avatar
              shape="square"
              size="large"
              src={roomUser.avatarURL}
              key={roomUser.id}
            />
          </Tooltip>
        );
      })}
    </div>
  </div>
);

export default RoomHeader;
