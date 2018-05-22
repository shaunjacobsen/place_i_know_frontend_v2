import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin, Divider } from 'antd';
import moment from 'moment';
import Train from './Train';

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
    if (
      this.props.trains === undefined ||
      (this.props.trains.loading && this.props.trains.loadingType === 'initial')
    ) {
      return (
        <div>
          <h3 className="booking-list__title">{this.renderTitle()}</h3>
          <Spin indicator={<Icon type="loading" spin />} /> Loading {this.props.group.title} transportation...
        </div>
      );
    }
    return (
      <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>
        <Divider />
        <Row gutter={6}>
          {this.props.group.trains.sort((a, b) => a < b).map(trainId => {
            return (
              <Col
                key={trainId}
                xs={24}
                sm={12}
                md={8}
              >
                <Train key={trainId} trainId={trainId} />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trains: state.activeTrip.trains,
  };
};

export default connect(mapStateToProps)(TrainGroup);
