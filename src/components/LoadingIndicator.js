import React from 'react';
import { Spin, Icon } from 'antd';

export const LoadingIndicator = props => {
  return (
    <div className="loading-indicator">
      <Spin
        indicator={<Icon type="loading" style={{ fontSize: '48px' }} spin />}
        style={{ width: '48px' }}
      />
      <p>{props.title}</p>
    </div>
  );
};
