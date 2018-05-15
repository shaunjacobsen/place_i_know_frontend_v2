import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Spin, Icon } from 'antd';
import { getItineraryDays, getItineraryDateRange } from './../../actions/itineraryDays';
import { getArrayOfDatesFromItineraryDays } from './../../helpers/itineraryHelpers';
import { showEventsForDate } from './../../selectors/itinerary';
import ItineraryDatesSelector from './ItineraryDatesSelector';
import ItineraryEvents from './ItineraryEvents';
import ItineraryEventsMap from './ItineraryEventsMap';

export class ItineraryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getItineraryDays(this.props.itinerary.data.itinerary_id);
  }

  getDateRange() {
    return getArrayOfDatesFromItineraryDays(this.props.activeTrip.itineraryDays.data);
  }

  render() {
    return (
      <div>
        <ItineraryDatesSelector range={this.getDateRange()} />
        <Divider />
        {this.props.itinerary.activeDate === undefined && (
          <div>
            <h2 style={{ textAlign: 'center' }}>Please select a date to get started.</h2>
          </div>
        )}
        {this.props.itinerary.activeDate && (
          <Row gutter={{ md: 24 }}>
            <Col xs={24} md={15}>
              <ItineraryEvents events={this.props.events} />
            </Col>
            <Col xs={24} md={9}>
              <ItineraryEventsMap events={this.props.events} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const activeDate = state.activeTrip.itinerary.activeDate;
  return {
    activeDate,
    activeTrip: state.activeTrip,
    events: showEventsForDate(activeDate, state.activeTrip.itineraryDays.data),
    itinerary: state.activeTrip.itinerary,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItineraryDays: itineraryId => dispatch(getItineraryDays(itineraryId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryPage);
