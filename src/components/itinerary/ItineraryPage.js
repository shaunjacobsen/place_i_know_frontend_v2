import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { getItineraryDates } from './../../actions/activeTrip';
import ItineraryDatesSelector from './ItineraryDatesSelector';
import ItineraryEvents from './ItineraryEvents';

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
        <Row>
          <Col xs={24} md={14}>
            <ItineraryEvents />
          </Col>
          <Col xs={24} md={10}>
            ItineraryEventsMap
          </Col>
        </Row>
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
