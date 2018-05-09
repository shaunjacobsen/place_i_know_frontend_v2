import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon, Modal } from 'antd';
import FlightGroup from './FlightGroup';

export class FlightGroupList extends React.Component {
  componentDidUpdate() {
    if (this.props.error) {
      Modal.error({
        title: this.props.error.title,
        content: <p>{this.props.error.message}</p>,
      });
    }
  }

  render() {
    return this.props.groups
      .sort((a, b) => {
        return a.sort_index > b.sort_index;
      })
      .map(group => {
        return <FlightGroup key={group.flight_group_id} group={group} />;
      });
  }
}

const mapStateToProps = state => {
  return {
    error: state.activeTrip.flightGroups.error,
  };
};

export default connect(mapStateToProps)(FlightGroupList);
