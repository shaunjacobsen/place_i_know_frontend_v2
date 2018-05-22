import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Icon, Spin, Divider, Button } from 'antd';
import { Alert } from './../../microcomponents/Alert';
import Train from './Train';
import { getTrains } from '../../../actions/trains';

export class TrainGroup extends React.Component {
  renderTitle() {
    if (this.props.group.confirmed) {
      return (
        <span>
          <Icon type="check-circle-o" style={{ color: '#85e1c8' }} />&nbsp;
          {this.props.group.title}
        </span>
      );
    } else {
      return <span>{this.props.group.title} Options</span>;
    }
  }

  render() {
    if (this.props.trains.error) {
      return (
        <Alert
          type="error"
          title={`Error loading ${this.props.group.title} ground transportation options`}
          actions={[
            <Button onClick={() => this.props.reload(this.props.tripId)}>Reload</Button>,
          ]}
          icon
        >
          There was an error loading the transportation options for{' '}
          {this.props.group.title}. Please check your Internet connection and try again.
        </Alert>
      );
    }
    if (
      this.props.trains === undefined ||
      (this.props.trains.loading && this.props.trains.loadingType === 'initial')
    ) {
      return (
        <div>
          <h3 className="booking-list__title">{this.renderTitle()}</h3>
          <Spin indicator={<Icon type="loading" spin />} /> Loading{' '}
          {this.props.group.title} transportation...
        </div>
      );
    }
    return (
      <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>
        <Row gutter={6}>
          {this.props.group.trains &&
            this.props.group.trains.sort((a, b) => a < b).map(trainId => {
              return (
                <Col key={trainId} xs={24} sm={12} md={8}>
                  <Train key={trainId} trainId={trainId} />
                </Col>
              );
            })}
        </Row>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trains: state.activeTrip.trains,
  tripId: state.activeTrip.trip_id,
});

const mapDispatchToProps = dispatch => ({
  reload: tripId => dispatch(getTrains(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainGroup);
