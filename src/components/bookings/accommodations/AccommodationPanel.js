import React from 'react';
import { connect } from 'react-redux';
import { Empty, Icon, Spin } from 'antd';
import { getActiveTripAccommodationsData } from './../../../actions/accommodations';
import AccommodationGroupList from './AccommodationGroupList';

export class AccommodationPanel extends React.Component {
  componentDidMount() {
    this.props.getAccommodationData(this.props.trip.trip_id);
  }

  render() {
    if (
      this.props.trip.accommodationGroups === undefined ||
      this.props.trip.accommodationGroups.loading
    ) {
      return (
        <div>
          <Spin indicator={<Icon type="loading" spin />} /> Loading hotel groups...
        </div>
      );
    }
    if (this.props.trip.accommodationGroups.data.length === 0) {
      return <Empty image="/images/plane-empty.png" />;
    }
    return (
      <div>
        <AccommodationGroupList
          groups={this.props.trip.accommodationGroups.data}
          reload={() => this.props.getAccommodationData(this.props.trip.trip_id)}
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
    getAccommodationData: tripId => dispatch(getActiveTripAccommodationsData(tripId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccommodationPanel);
