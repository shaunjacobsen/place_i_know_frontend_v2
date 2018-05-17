import React from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;

export const CreateMessageForm = ({
  state: { user = {}, room = {}, message = '' },
  actions: { handleSendMessage },
}) =>
  room.id ? (
    <div className="chat__conversation__compose">
      <form
        onSubmit={e => {
          e.preventDefault();
          const message = e.target[0].value;
          e.target[0].value = '';
          message.length > 0 && handleSendMessage({ message });
        }}
      >
        <input
          autoFocus
          placeholder="Type your message..."
          onInput={e => user.isTypingIn({ roomId: room.id })}
        />
        <Button type="primary" icon="arrow-right" />
      </form>
    </div>
  ) : null;

export default CreateMessageForm;
