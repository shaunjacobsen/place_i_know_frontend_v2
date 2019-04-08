import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon } from 'antd';
import { getItineraryEventsForDate } from './../../actions/activeTrip';
import ItineraryDatesSelectorOption from './ItineraryDatesSelectorOption';

export class ItineraryDatesSelector extends React.Component {
  render() {
    return (
      <div className="itinerary-dates-selector">
        {typeof this.props.range !== 'undefined' &&
          this.props.range
            .sort((a, b) => {
              return new Date(a) - new Date(b);
            })
            .map(date => <ItineraryDatesSelectorOption key={date} date={date} />)}
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
