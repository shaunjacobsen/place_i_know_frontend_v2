import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { ChatMessage } from './ChatMessage';

export class ConversationPane extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="chat__conversation__list">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      );
    }
    return (
      <div className="chat__conversation__list">
        {this.props.messages.map(message => {
          return (
            <ChatMessage
              message={message}
              key={message.id}
              sentByCurrentUser={message.sender.id === this.props.chat.id}
            />
          );
        })}
      </div>
    );
  }
}

export default ConversationPane;
