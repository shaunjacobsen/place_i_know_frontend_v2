import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon, Col, Row } from 'antd';
import { TripCard } from './trips/TripCard';
import { getTrips } from '../actions/trip';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getTrips());
  }

  renderTrips() {
    return (
      <Row gutter={16}>
        {this.props.trips.map(trip => (
          <Col key={trip.trip_id} xs={24} md={8}>
            <TripCard
              key={trip.trip_id}
              tripId={trip.trip_id}
              title={trip.title}
              image={trip.image.secure_url}
              startDate={trip.start_date}
              endDate={trip.end_date}
            />
          </Col>
        ))}
      </Row>
    );
  }

  content() {
    if (this.props.error) {
      return <div />;
    } else if (this.props.loading) {
      return <Spin size="large" indicator={<Icon type="loading" spin />} />;
    } else if (this.props.trips) {
      return this.renderTrips();
    }
  }

  render() {
    return (
      <div className="content-area">
        <h1>Welcome, {this.props.user.firstName}!</h1>
        <div className="content-card">
          <h2>My Trips</h2>
          {this.content()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    trips: state.trips.tripsList,
    loading: state.trips.loading,
    error: state.trips.error,
  };
};

export default connect(mapStateToProps)(Dashboard);
