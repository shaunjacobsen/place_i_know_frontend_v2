import React from 'react';
import { Divider, Icon } from 'antd';

export const ItineraryEventBaseInfo = props => {
  return (
    <div className="card__basic-information">
      <span className="card__basic-information--purple">
        <Icon type="clock-circle-o" /> {props.event.event_duration}
      </span>
      <Divider type="vertical" />
      <Icon type="clock-circle-o" /> {props.event.event_duration}
    </div>
  );
};
