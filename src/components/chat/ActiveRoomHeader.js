import React from 'react';
import { Avatar, Tooltip } from 'antd';

export const ActiveRoomHeader = props => {
  return (
    <div className="chat__conversation__header">
      <h2>{props.room.name}</h2>
      <div className="users">
        {props.room.users.map(user => {
          return (
            <Tooltip
              title={props.currentUserId === user.id ? 'You' : user.name}
              key={user.id}
            >
              <Avatar
                shape="square"
                size="large"
                src={user.avatarURL}
                key={user.id}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveRoomHeader;
