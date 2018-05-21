import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon, Modal } from 'antd';
import AccommodationGroup from './AccommodationGroup';

export class AccommodationGroupList extends React.Component {
  componentDidUpdate() {
    if (this.props.error) {
      Modal.error({
        title: this.props.error.title,
        content: <p>{this.props.error.message}</p>,
      });
    }
  }

  sortGroupsByStartDate(groups) {
    return groups.sort((a, b) => {
      return moment(a.start_date).unix() - moment(b.start_date).unix();
    });
  }

  render() {
    return this.sortGroupsByStartDate(this.props.groups).map(group => {
      return <AccommodationGroup key={group.accommodation_group_id} group={group} />;
    });
  }
}

const mapStateToProps = state => {
  return {
    error: state.activeTrip.accommodationGroups.error,
  };
};

export default connect(mapStateToProps)(AccommodationGroupList);
