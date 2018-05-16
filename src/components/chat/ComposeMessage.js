import React from 'react';
import { Input } from 'antd';
import TypingIndicator from './TypingIndicator';
const { TextArea } = Input;

export class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onKeyPress = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.onSubmit(e);
    }
  };
  
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState(() => ({
      text: '',
    }));
  };

  onChange = e => {
    const eventTargetValue = e.target.value;
    this.setState(() => ({
      text: eventTargetValue,
    }));
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render() {
    return (
      <div className="chat__conversation__compose">
        <form onSubmit={this.onSubmit}>
          <TextArea
            autoFocus
            autosize={{ minRows: 1, maxRows: 4 }}
            onChange={this.onChange}
            onKeyDown={this.onKeyPress}
            placeholder="Type your message!"
            value={this.state.text}
          />
        </form>
        <TypingIndicator usersTyping={this.props.usersTyping} />
      </div>
    );
  }
}

export default ComposeMessage;
