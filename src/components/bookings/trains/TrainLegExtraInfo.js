import React from 'react';
import { Icon } from 'antd';

export const TrainLegExtraInfo = props => {
  return (
    <div
      className={
        props.visible
          ? 'card__additional-information'
          : 'card__additional-information--hidden'
      }
    >
      {props.visible ? <div>
        <strong>Class</strong>&nbsp;{props.info.class}<br />
        <strong>WiFi?</strong>&nbsp;{props.info.wifi}<br />
      </div> : ''}
    </div>
  );
};
