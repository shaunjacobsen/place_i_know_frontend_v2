import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon, Modal } from 'antd';
import TrainGroup from './TrainGroup';

export class TrainGroupList extends React.Component {
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
        return <TrainGroup key={group.train_group_id} group={group} />;
      });
  }
}

const mapStateToProps = state => {
  return {
    error: state.activeTrip.trainGroups.error,
  };
};

export default connect(mapStateToProps)(TrainGroupList);
