import React from 'react';
import { connect } from 'react-redux';
import { Empty, Icon, Spin } from 'antd';
import { getActiveTripTrainData } from './../../../actions/trains';
import TrainGroupList from './TrainGroupList';

export class TrainPanel extends React.Component {
  componentDidMount() {
    this.props.getTrainData(this.props.trip.trip_id);
  }

  render() {
    if (
      this.props.trip.trainGroups === undefined ||
      this.props.trip.trainGroups.loading
    ) {
      return (
        <div>
          <Spin indicator={<Icon type="loading" spin />} /> Loading train groups...
        </div>
      );
    }
    if (this.props.trip.trainGroups.data.length === 0) {
      return <Empty image="/images/plane-empty.png" />;
    }
    return (
      <div>
        <TrainGroupList
          groups={this.props.trip.trainGroups.data}
          reload={() => this.props.getTrainData(this.props.trip.trip_id)}
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
    getTrainData: tripId => dispatch(getActiveTripTrainData(tripId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainPanel);
