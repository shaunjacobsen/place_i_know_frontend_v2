import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon, Modal, Button } from 'antd';
import { Alert } from './../../microcomponents/Alert';
import TrainGroup from './TrainGroup';
import { getTrainGroups } from '../../../actions/trainGroups';

export class TrainGroupList extends React.Component {
  componentDidUpdate() {
    if (this.props.selectError) {
      Modal.error({
        title: this.props.selectError.title,
        content: <p>{this.props.selectError.message}</p>,
      });
    }
  }

  render() {
    if (this.props.error) {
      return (
        <Alert
          type="error"
          title="Error loading transportation options"
          actions={[<Button onClick={this.props.reload}>Reload</Button>]}
          icon
        >
          There was an error loading the transportation options for your trip. Please
          check your Internet connection and try again.
        </Alert>
      );
    }
    return this.props.groups
      .sort((a, b) => {
        return a.sort_index > b.sort_index;
      })
      .map(group => {
        return <TrainGroup key={group.train_group_id} group={group} />;
      });
  }
}

const mapStateToProps = state => ({
  error: state.activeTrip.trainGroups.error,
  selectError: state.activeTrip.trainGroups.selectError,
});

export default connect(mapStateToProps)(TrainGroupList);
