import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin, Divider, Button } from 'antd';
import moment from 'moment';
import Accommodation from './Accommodation';
import { Alert } from './../../microcomponents/Alert';
import { DateRange } from './../../DateRange';
import { getAccommodations } from './../../../actions/accommodations';
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
    if (this.props.accommodations.error) {
      return (
        <Alert
          type="error"
          title={`Error loading ${this.props.group.title} hotels`}
          actions={[
            <Button onClick={() => this.props.reload(this.props.tripId)}>Reload</Button>,
          ]}
          icon
        >
          There was an error loading the hotels for {this.props.group.title}. Please check
          your Internet connection and try again.
        </Alert>
      );
    }
    if (
      this.props.accommodations === undefined ||
      (this.props.accommodations.loading &&
        this.props.accommodations.loadingType === 'initial')
    ) {
      return (
        <div>
          <h3 className="booking-list__title">{this.renderTitle()}</h3>
          <Spin indicator={<Icon type="loading" spin />} /> Loading{' '}
          {this.props.group.title} hotels...
        </div>
      );
    }
    return (
      <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>

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
          <Divider />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tripId: state.activeTrip.trip_id,
  accommodations: state.activeTrip.accommodations,
});

const mapDispatchToProps = dispatch => ({
  reload: tripId => dispatch(getAccommodations(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationGroup);
