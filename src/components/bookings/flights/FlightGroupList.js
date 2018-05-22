import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Icon, Modal, Button } from 'antd';
import { Alert } from './../../microcomponents/Alert';
import FlightGroup from './FlightGroup';

export class FlightGroupList extends React.Component {
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
          title="Error loading flights"
          actions={[<Button onClick={this.props.reload}>Reload</Button>]}
          icon
        >
          There was an error loading the flights for your trip. Please check your Internet
          connection and try again.
        </Alert>
      );
    }
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
    selectError: state.activeTrip.flightGroups.selectError,
  };
};

export default connect(mapStateToProps)(FlightGroupList);
