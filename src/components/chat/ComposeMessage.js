import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

export class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

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
          <input
            autoFocus
            placeholder="Type your message!"
            onChange={this.onChange}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

export default ComposeMessage;
