import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Divider, Row } from 'antd';
import { getItineraryDays } from './../../actions/itineraryDays';
import { getArrayOfDatesFromItineraryDays } from './../../helpers/itineraryHelpers';
import { showEventsForDate } from './../../selectors/itinerary';
import ItineraryDatesSelector from './ItineraryDatesSelector';
import ItineraryEvents from './ItineraryEvents';
import ItineraryEventsMap from './ItineraryEventsMap';
import { ProposedItineraries } from './ProposedItineraries';

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
    const { proposedItineraries } = this.props;
    if (
      proposedItineraries &&
      proposedItineraries.data &&
      proposedItineraries.data.filter(pI => pI.status !== 'hidden').length > 0
    ) {
      return (
        <div>
          <Alert
            message="Your proposed itineraries"
            description="Proposed itineraries are outlines of trips that your travel planner has selected for you. Once you have chosen an itinerary that you like, please let your travel planner know &mdash; we'll start researching hotels, transportation, and activities after that."
            type="info"
            showIcon
          />
          <Divider />
          <ProposedItineraries itineraries={proposedItineraries.data} />
        </div>
      );
    } else {
      if (this.props.activeTrip.itineraryDays.data.length > 0) {
        return (
          <div>
            <ItineraryDatesSelector range={this.getDateRange()} />
            <Divider />
            {this.props.itinerary.activeDate === undefined && (
              <div>
                <h2 style={{ textAlign: 'center' }}>
                  Please select a date to get started.
                </h2>
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
      } else {
        return (
          <div>
            <Alert
              message="Planning in progress"
              description="Your travel planner is currently working on your trip. Please check back later, or send us a chat if you have any questions!"
              type="warning"
              showIcon
            />
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  const activeDate = state.activeTrip.itinerary.activeDate;
  return {
    activeDate,
    activeTrip: state.activeTrip,
    events: showEventsForDate(activeDate, state.activeTrip.itineraryDays.data),
    itinerary: state.activeTrip.itinerary,
    proposedItineraries: state.activeTrip.proposedItineraries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItineraryDays: itineraryId => dispatch(getItineraryDays(itineraryId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryPage);
