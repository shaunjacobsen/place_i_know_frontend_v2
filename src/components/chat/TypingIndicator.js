import React from 'react';

export class TypingIndicator extends React.Component {
  render() {
    if (this.props.usersTyping.length > 0) {
      return (
        <div className="chat__typing">{`${this.props.usersTyping
          .slice(0, 2)
          .join(' and ')} is typing`}</div>
      );
    }
    return <div className="chat__typing" />;
  }
}

export default TypingIndicator;
