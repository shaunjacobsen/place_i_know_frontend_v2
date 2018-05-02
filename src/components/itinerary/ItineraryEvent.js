import React from 'react';
import { Divider, List, Icon, Tooltip } from 'antd';
import { ItineraryEventBaseInfo } from './ItineraryEventBaseInfo';
import { ItineraryEventDetails } from './ItineraryEventDetails';
import { ItineraryEventActions } from './ItineraryEventActions';

export const ItineraryEvent = props => {
  return (
    <List.Item key={props.event.event_id}>
      <div className="card">
        <div className="card__content">
          <div className="card__image card__image--left">
            <img src={props.event.event_image_url || props.event.place_image_url} />
          </div>
          <div className="card__content--text">
            <div className="card__title">{props.event.event_title}</div>
            <Divider style={{ margin: '12px 0' }} />
            <ItineraryEventBaseInfo event={props.event} />
            <ItineraryEventDetails event={props.event} />
            <Divider style={{ margin: '12px 0' }} />
            <ItineraryEventActions event={props.event} />
          </div>
        </div>
      </div>
    </List.Item>
  );
};
