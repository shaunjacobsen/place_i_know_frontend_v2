import React from 'react';

const dots = <div className="chat__dots">{[0, 1, 2].map(x => <div key={x} />)}</div>;

export const TypingIndicator = ({ typing = {} }) =>
  Object.keys(typing).length ? (
    <div className="chat__typing">
      <div>{dots}</div>
      <div>{`${Object.keys(typing)
        .slice(0, 2)
        .join(' and ')} is typing`}</div>
    </div>
  ) : null;

export default TypingIndicator;
