import React from 'react';
import { connect } from 'react-redux';
import { Empty, Icon, Spin } from 'antd';
import { getActiveTripFlightData } from './../../../actions/flights';
import FlightGroupList from './FlightGroupList';

export class FlightPanel extends React.Component {
  componentDidMount() {
    this.props.getFlightData(this.props.trip.trip_id);
  }

  render() {
    if (
      this.props.trip.flightGroups === undefined ||
      this.props.trip.flightGroups.loading
    ) {
      return (
        <div>
          <Spin indicator={<Icon type="loading" spin />} /> Loading flight groups...
        </div>
      );
    }
    if (this.props.trip.flightGroups.data.length === 0) {
      return <Empty image="/images/plane-empty.png" />;
    }
    return (
      <div>
        <FlightGroupList
          groups={this.props.trip.flightGroups.data}
          reload={() => this.props.getFlightData(this.props.trip.trip_id)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trip: state.activeTrip,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFlightData: tripId => dispatch(getActiveTripFlightData(tripId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightPanel);
