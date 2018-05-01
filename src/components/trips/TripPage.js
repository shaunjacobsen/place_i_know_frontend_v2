import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Divider } from 'antd';
import { AttendeesList } from './AttendeesList';

export class TripPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTripLength() {
    return moment(this.props.trip.end_date).diff(
      moment(this.props.trip.start_date),
      'days'
    );
  }

  render() {
    return (
      <div className="content-area">
        <h1>{this.props.trip.title}</h1>
        <div className="content-card">
          {this.renderTripLength()}-night trip<br />
          {moment(this.props.trip.start_date).fromNow()}
          <Divider />
          <Row>
            <Col sm={24} md={8}>
              <h3>Who's Going?</h3>
              <AttendeesList attendees={this.props.trip.attendees} />
            </Col>

            <Col sm={24} md={8}>
              Itineraries
            </Col>

            <Col sm={24} md={8}>
              Finances
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    trip: state.trips.tripsList.find(trip => {
      return trip.trip_id == props.match.params.id;
    }),
  };
};

export default connect(mapStateToProps)(TripPage);
