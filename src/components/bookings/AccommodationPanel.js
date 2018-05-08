import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { getActiveTripAccommodationsData } from './../../actions/accommodations';
import { AccommodationGroupList } from './AccommodationGroupList';

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
          <Spin indicator={<Icon type="loading" spin />} /> Loading...
        </div>
      );
    }
    return (
      <div>
        <AccommodationGroupList groups={this.props.trip.accommodationGroups.data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationPanel);
