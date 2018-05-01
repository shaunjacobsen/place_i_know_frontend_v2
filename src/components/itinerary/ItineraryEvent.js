import React from 'react';
import { Card, List } from 'antd';

export const ItineraryEvent = props => {
  return (
    <List.Item key={props.event.event_id}>
      <Card
        title={props.event.event_title}
        // cover={
        //   <img
        //     width={150}
        //     src={props.event.event_image_url || props.event.place_image_url}
        //   />
        // }
      >
        {props.event.event_notes}
      </Card>
    </List.Item>
  );
};
