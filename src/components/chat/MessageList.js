import React from 'react';
import { Message } from './Message';

const emptyList = (
  <div className="">
    <h2>No Messages Yet</h2>
    <p>Let us know if you have any questions about your trip!</p>
  </div>
);

export const MessageList = ({ messages = {}, user }) => (
  <div id="messages" className="chat__conversation__list">
    {Object.keys(messages).length > 0 ? (
      <wrapper->
        {Object.keys(messages)
          .map(k => Message({ user })(messages[k]))}
      </wrapper->
    ) : (
      emptyList
    )}
  </div>
);

export default MessageList;