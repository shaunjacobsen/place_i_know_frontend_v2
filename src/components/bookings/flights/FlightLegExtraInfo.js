import React from 'react';
import { Icon } from 'antd';

export const FlightLegExtraInfo = props => {
  return (
    <div
      className={
        props.visible
          ? 'card__additional-information'
          : 'card__additional-information--hidden'
      }
    >
      {props.visible ? <div>
        <strong>Class</strong>&nbsp;{props.info.fare_class} ({props.info.fare_code})<br />
        <strong>WiFi?</strong>&nbsp;{props.info.wifi_on_board}<br />
        <strong>Meal?</strong>&nbsp;{props.info.meal_type}
      </div> : ''}
    </div>
  );
};
