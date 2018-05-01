import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import { ItineraryEvent } from './ItineraryEvent';

export class ItineraryEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEventComponent(event) {
    switch (event.type) {
      case 'event':
        return <ItineraryEvent key={event.day_id} event={event} />;
      default:
        return event.type;
    }
  }

  render() {
    return (
      <div>
        <List itemLayout="vertical" size="large" loading={this.props.loading}>
          {this.props.events.map(event => this.renderEventComponent(event))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const activeDate = state.activeTrip.itinerary.activeDate;
  return {
    activeDate,
    events: activeDate ? state.activeTrip.itinerary.dates[activeDate] : [],
    loading: state.activeTrip.itinerary.loading,
  };
};

export default connect(mapStateToProps)(ItineraryEvents);
