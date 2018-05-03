import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getItineraryEventsForDate } from './../../actions/activeTrip';
import ItineraryDatesSelectorOption from './ItineraryDatesSelectorOption';

export class ItineraryDatesSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itinerary-dates-selector">
        {this.props.dates.map(date => (
          <ItineraryDatesSelectorOption key={date} date={date} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // activeDate:
    //   state.activeTrip.itinerary.activeDate ||
    //   Object.keys(state.activeTrip.itinerary.dates)[0],
  };
};

export default connect(mapStateToProps)(ItineraryDatesSelector);
