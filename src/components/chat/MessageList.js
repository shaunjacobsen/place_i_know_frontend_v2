import React from 'react';
import { Message } from './Message';

const emptyList = (
  <div className="">
    <span role="img" aria-label="post">
      📝
    </span>
    <h2>No Messages Yet</h2>
    <p>Be the first to post in this room or invite someone to join the room</p>
  </div>
);

export const MessageList = ({ messages = {}, user }) => (
  <div id="messages" className="chat__conversation__list">
    {Object.keys(messages).length > 0 ? (
      <wrapper->
        {Object.keys(messages)
          .reverse()
          .map(k => Message({ user })(messages[k]))}
      </wrapper->
    ) : (
      emptyList
    )}
  </div>
);

export default MessageList;