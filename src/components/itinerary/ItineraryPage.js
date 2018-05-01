import React from 'react';
import { connect } from 'react-redux';
import { getItineraryDates } from './../../actions/activeTrip';
import ItineraryDatesSelector from './ItineraryDatesSelector';

export class ItineraryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getItineraryDates();
  }

  render() {
    return (
      <div>
        <ItineraryDatesSelector dates={Object.keys(this.props.itinerary.dates || {})} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itinerary: state.activeTrip.itinerary,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItineraryDates: () => dispatch(getItineraryDates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryPage);
