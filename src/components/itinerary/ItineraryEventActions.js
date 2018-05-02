import React from 'react';
import { Divider, Icon, Tooltip } from 'antd';

export const ItineraryEventActions = props => {
  return (
    <div className="card__actions">
      <div className="card__action">
        <Tooltip arrowPointAtCenter title="Leave a rating">
          <Icon className="card__action__icon" type="star" />
        </Tooltip>
      </div>
      <Divider type="vertical" />
      <div className="card__action">
        <Tooltip arrowPointAtCenter title="Ask your travel planner about this">
          <Icon className="card__action__icon" type="message" />
        </Tooltip>
      </div>
    </div>
  );
};
