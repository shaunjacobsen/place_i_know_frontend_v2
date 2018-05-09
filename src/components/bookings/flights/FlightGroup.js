import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Spin } from 'antd';
import moment from 'moment';
import Flight from './Flight';

export class FlightGroup extends React.Component {
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
      this.props.flights === undefined ||
      (this.props.flights.loading && this.props.flights.loadingType === 'initial')
    ) {
      return (
        <div>
          <h3 className="booking-list__title">{this.renderTitle()}</h3>
          <Spin indicator={<Icon type="loading" spin />} /> Loading {this.props.group.title} flights...
        </div>
      );
    }
    return (
      <div>
        <h3 className="booking-list__title">{this.renderTitle()}</h3>
        <Row gutter={6}>
          {this.props.group.flights.sort((a, b) => a < b).map(flightId => {
            return (
              <Col
                key={flightId}
                xs={24}
                sm={12}
                md={8}
              >
                <Flight key={flightId} flightId={flightId} />
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
    flights: state.activeTrip.flights,
  };
};

export default connect(mapStateToProps)(FlightGroup);
