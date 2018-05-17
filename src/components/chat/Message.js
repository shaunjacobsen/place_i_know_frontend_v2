import React from 'react';
import Linkify from 'react-linkify';
import moment from 'moment';
import { Avatar, Badge } from 'antd';

export const Message = ({ user }) => message =>
  message.sender ? (
    <div
      key={message.id}
      className={
        message.sender.id === user.id
          ? 'chat__conversation__message right'
          : 'chat__conversation__message'
      }
    >
      {message.sender.id !== user.id ? (
        <Badge
          status={
            message.sender.presence && message.sender.presence.state === 'online'
              ? 'success'
              : 'default'
          }
        >
          <Avatar shape="square" src={message.sender.avatarURL} />
        </Badge>
      ) : null}

      <div>
        <span>{`${message.sender.name} | ${moment(message.createdAt).fromNow()}`}</span>
        <p>
          <Linkify properties={{ target: '_blank' }}>{message.text}</Linkify>
        </p>
      </div>

      {message.sender.id === user.id ? (
        <Avatar shape="square" src={message.sender.avatarURL} />
      ) : null}
    </div>
  ) : null;
