import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Popover } from 'antd';

export const Attendee = props => {
  return (
    <div style={{display: 'inline-block', paddingRight: 5, paddingBottom: 5}}>
      <Popover content={props.fullName} placement="bottom">
        <Avatar src={props.image} shape="square" size="large" />
      </Popover>
    </div>
  );
};
