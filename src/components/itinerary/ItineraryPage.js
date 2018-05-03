import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider } from 'antd';
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
        <Divider />
        {!this.props.itinerary.activeDate && (
          <div>
            <h2 style={{ textAlign: 'center' }}>Please select a date to get started.</h2>
          </div>
        )}
        {this.props.itinerary.activeDate && (
          <Row>
            <Col xs={24} md={15}>
              <ItineraryEvents />
            </Col>
            <Col xs={24} md={9}>
              ItineraryEventsMap
            </Col>
          </Row>
        )}
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
