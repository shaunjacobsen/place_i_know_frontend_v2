import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import ItineraryEvent from './ItineraryEvent';
import { ItineraryNote } from './ItineraryNote';
import { ItineraryDirections } from './ItineraryDirections';

export class ItineraryEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEventComponent(event) {
    switch (event.type) {
      case 'event':
        return <ItineraryEvent key={event.day_id} eventId={event.event_id} />;
      case 'note':
        return <ItineraryNote key={event.day_id} note={event.day_attributes} />;
      case 'directions':
        return (
          <ItineraryDirections key={event.day_id} directions={event.day_attributes} />
        );
      default:
        return event.type;
    }
  }

  render() {
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          split={false}
          loading={this.props.loading}
        >
          {this.props.events.map(event => this.renderEventComponent(event))}
        </List>
      </div>
    );
  }
}

export default ItineraryEvents;
