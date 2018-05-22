import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Icon, Spin, Divider, Button } from 'antd';
import { Alert } from './../../microcomponents/Alert';
import { getFlights } from './../../../actions/flights';
import Flight from './Flight';

export class FlightGroup extends React.Component {
  renderTitle() {
    if (this.props.group.confirmed) {
      return (
        <span>
          <Icon type="check-circle-o" style={{ color: '#85e1c8' }} />&nbsp;
          {this.props.group.title}
        </span>
      );
    } else {
      return <span>{this.props.group.title} Options</span>;
    }
  }

  render() {
    if (this.props.flights.error) {
      return (
        <Alert
          type="error"
          title={`Error loading ${this.props.group.title} flights`}
          actions={[
            <Button onClick={() => this.props.reload(this.props.tripId)}>Reload</Button>,
          ]}
          icon
        >
          There was an error loading the flights for {this.props.group.title}. Please
          check your Internet connection and try again.
        </Alert>
      );
    }
    if (
      this.props.flights === undefined ||
      (this.props.flights.loading && this.props.flights.loadingType === 'initial')
    ) {
      return (
        <div>
          <h3 className="booking-list__title">{this.renderTitle()}</h3>
          <Spin indicator={<Icon type="loading" spin />} /> Loading{' '}
          {this.props.group.title} flights...
        </div>
      );
    }
    return (
      <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>
        <Row gutter={6}>
          {this.props.group.flights &&
            this.props.group.flights.sort((a, b) => a < b).map(flightId => {
              return (
                <Col key={flightId} xs={24} sm={12} md={8}>
                  <Flight key={flightId} flightId={flightId} />
                </Col>
              );
            })}
        </Row>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  flights: state.activeTrip.flights,
  tripId: state.activeTrip.trip_id,
});

const mapDispatchToProps = dispatch => ({
  reload: tripId => dispatch(getFlights(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightGroup);
