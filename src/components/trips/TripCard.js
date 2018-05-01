import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card } from 'antd';
const { Meta } = Card;

export const TripCard = props => {
  return (
    <div>
      <Card
        cover={
          <img className="trip__image--preview" alt={props.title} src={props.image} />
        }
      >
        <Meta
          title={props.title}
          description={moment(props.startDate).fromNow()}
        />
      </Card>
    </div>
  );
};
