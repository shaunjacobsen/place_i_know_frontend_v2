import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon, Modal, Button } from 'antd';
import AccommodationGroup from './AccommodationGroup';
import { Alert } from '../../microcomponents/Alert';

export class AccommodationGroupList extends React.Component {
  componentDidUpdate() {
    if (this.props.selectionError) {
      Modal.error({
        title: this.props.selectionError.title,
        content: <p>{this.props.selectionError.message}</p>,
      });
    }
  }

  sortGroupsByStartDate(groups) {
    return groups.sort((a, b) => {
      return moment(a.start_date).unix() - moment(b.start_date).unix();
    });
  }

  render() {
    if (this.props.error) {
      return (
        <Alert
          type="error"
          title="Error loading accommodations"
          actions={[<Button onClick={this.props.reload}>Reload</Button>]}
          icon
        >
          There was an error loading the accommodations for your trip. Please check your
          Internet connection and try again.
        </Alert>
      );
    }
    return this.sortGroupsByStartDate(this.props.groups).map(group => {
      return <AccommodationGroup key={group.accommodation_group_id} group={group} />;
    });
  }
}

const mapStateToProps = state => {
  return {
    error: state.activeTrip.accommodationGroups.error,
    selectionError: state.activeTrip.accommodationGroups.selectError,
  };
};

export default connect(mapStateToProps)(AccommodationGroupList);
