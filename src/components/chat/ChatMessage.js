import React from 'react';
import moment from 'moment';
import { Avatar, Tooltip } from 'antd';

export class ChatMessage extends React.Component {
  determineClass = () => {
    return this.props.sentByCurrentUser
      ? 'chat__conversation__message--right'
      : 'chat__conversation__message--left';
  };
  render() {
    return (
      <div className={`chat__conversation__message ${this.determineClass()}`}>
        {!this.props.sentByCurrentUser && (
          <div className="chat__conversation__message-sender">
            <Tooltip title={this.props.message.sender.name}>
              <Avatar
                shape="circle"
                size="small"
                src={this.props.message.sender.avatarURL}
              />
            </Tooltip>
          </div>
        )}
        <Tooltip title={moment(this.props.message.created).fromNow()}>
          <div className="chat__conversation__message-text">
            {this.props.message.text}
          </div>
        </Tooltip>
      </div>
    );
  }
}
