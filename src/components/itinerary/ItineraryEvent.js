import React from 'react';
import { connect } from 'react-redux';
import { Divider, List, Icon, Tooltip } from 'antd';
import { ItineraryEventBaseInfo } from './ItineraryEventBaseInfo';
import { ItineraryEventDetails } from './ItineraryEventDetails';
import { ItineraryEventActions } from './ItineraryEventActions';
import { selectEventById } from './../../selectors/itinerary';
import { selectPlaceById } from '../../selectors/place';

export const ItineraryEvent = props => {
  return (
    <List.Item key={props.event.event_id}>
      <div className="card">
        <div className="card__content">
          <div className="card__image">
            <img
              src={
                (props.event.image && props.event.image.secure_url) ||
                props.place.image.secure_url
              }
            />
          </div>
          <div className="card__content--text">
            <div className="card__title">{props.event.title}</div>
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

const mapStateToProps = (state, props) => {
  const event = selectEventById(props.eventId, state.activeTrip.events.data);
  return {
    event,
    place: selectPlaceById(event.places[0], state.activeTrip.places.data),
  };
};

export default connect(mapStateToProps)(ItineraryEvent);
