import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { getItineraryAccommodations } from './../../actions/activeTrip';
import { AccommodationGroup } from './AccommodationGroup';

export class AccommodationGroupList extends React.Component {
  componentDidMount() {
    this.props.getAccommodations();
  }

  render() {
    return this.props.groups.map(group => {
      return <AccommodationGroup key={group.accommodation_group_id} group={group} />;
    });
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.activeTrip.bookings.accommodations.loading,
    groups: state.activeTrip.bookings.accommodations.groups,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccommodations: () => dispatch(getItineraryAccommodations()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationGroupList);
