import React from 'react';
import { connect } from 'react-redux';
import { Alert, Icon, Divider, Button, Rate } from 'antd';
import moment from 'moment';
import { FlightLeg } from './FlightLeg';
import { pluralize } from './../../../helpers/stringHelpers';
import { flightMarkSelected } from './../../../actions/flights';
import { selectElementById } from './../../../selectors/booking';
import { selectPlaceById } from './../../../selectors/place';

export class Flight extends React.Component {
  handleFlightSelection = () => {
    this.props.selectFlight(this.props.flight.flight_id);
  };

  determineCardOrientation() {
    return this.props.flight.status.toLowerCase() === 'confirmed'
      ? 'card__content'
      : 'card__content--column';
  }

  displayBookingActions() {
    if (this.props.flight.status.toLowerCase() === 'confirmed') {
      return (
        <div className="confirmation-status confirmation-status--confirmed">
          <Icon type="check-circle-o" />&nbsp;<strong>Booked</strong>
        </div>
      );
    } else if (this.props.flight.status.toLowerCase() === 'selected') {
      return (
        <div className="confirmation-status confirmation-status--selected">
          <Icon type="check-circle-o" />&nbsp;<strong>Selected</strong>
        </div>
      );
    } else {
      return (
        <div className="confirmation-status confirmation-status--proposed">
          <Button
            type="primary"
            disabled={this.props.isUpdatingFlights}
            loading={this.props.isUpdatingFlights}
            onClick={this.handleFlightSelection}
          >
            {this.props.isUpdatingFlights ? 'Updating...' : 'Select this flight'}
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card__content-column">
          <div className="card__content--text">
            <div className="flight-legs">
              {this.props.legs.map(leg => {
                return <FlightLeg leg={leg} />;
              })}
            </div>
            <Divider />
            <div className="flight-information">
              <span className="price">
                {Number(this.props.flight.total).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>&nbsp;<small>
                for {pluralize(this.props.flight.passenger_count, 'passenger')}
                <br />incl. tax, excl. luggage
              </small>
            </div>
            <Divider />
            <div className="card__actions">{this.displayBookingActions()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const flight = selectElementById(
    props.flightId,
    state.activeTrip.flights.data,
    'flight_id'
  );
  return {
    flight,
    legs: flight.flight_legs.sort((a, b) => {
      return moment(a.departure_time).unix() > moment(b.departure_time).unix();
    }),
    isUpdatingFlights: state.activeTrip.flights.loadingType === 'refresh' ? true : false,
    isConfirmed: flight.status.toLowerCase() === 'confirmed',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFlight: id => dispatch(flightMarkSelected(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
