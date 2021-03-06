import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon, Col, Row, Button } from 'antd';
import { Alert } from './microcomponents/Alert';
import { TripCard } from './trips/TripCard';
import { getTrips } from '../actions/trip';
import { resetActiveTrip } from '../actions/activeTrip';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTrips();
    this.props.resetActiveTrip();
  }

  renderTrips() {
    return (
      <Row gutter={16}>
        {this.props.trips.sort((a, b) => a.start_date < b.start_date).map(trip => (
          <Col key={trip.trip_id} xs={24} md={8} gutter={8}>
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

  renderContent() {
    if (this.props.error) {
      return (
        <Alert
          title="Couldn't load trips"
          type="error"
          actions={[
            <Button onClick={this.props.getTrips}>
              Refresh
            </Button>,
          ]}
          icon
        >
          There was a problem loading your trips. Please try again or contact your travel
          planner.
        </Alert>
      );
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
          {this.renderContent()}
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

const mapDispatchToProps = dispatch => ({
  getTrips: () => dispatch(getTrips()),
  resetActiveTrip: () => dispatch(resetActiveTrip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
