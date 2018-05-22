import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin, Divider } from 'antd';
import moment from 'moment';
import Accommodation from './Accommodation';
import { DateRange } from './../../DateRange';
import { showAccommodationsForGroupBasedOnConfirmationStatus } from './../../../selectors/accommodation';

export class AccommodationGroup extends React.Component {
  renderTitle() {
    if (this.props.group.status === 'confirmed') {
      return (
        <span>
          <Icon type="check-circle-o" style={{ color: '#85e1c8' }} />&nbsp;
          {this.props.group.title}
        </span>
      );
    } else {
      return (
        <span>
          {this.props.group.title} Options&nbsp;<small>
            {' '}
            for{' '}
            <DateRange
              start={this.props.group.start_date}
              end={this.props.group.end_date}
            />
          </small>
        </span>
      );
    }
  }

  render() {
    if (
      this.props.trip.accommodations === undefined ||
      (this.props.trip.accommodations.loading &&
        this.props.trip.accommodations.loadingType === 'initial')
    ) {
      return (
        <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>
          <Spin indicator={<Icon type="loading" spin />} /> Loading {this.props.group.title} hotels...
        </div>
      );
    }
    return (
      <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>
        <Divider />
        <Row gutter={6}>
          {this.props.group.accommodation.sort((a, b) => a - b).map(accommodationId => {
            return (
              <Col
                key={accommodationId}
                xs={24}
                sm={12}
                md={this.props.group.status === 'confirmed' ? 24 : 8}
              >
                <Accommodation key={accommodationId} accommodationId={accommodationId} />
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
    trip: state.activeTrip,
  };
};

export default connect(mapStateToProps)(AccommodationGroup);
