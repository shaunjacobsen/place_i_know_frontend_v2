import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Divider, Tabs, Badge, Button, Spin, Icon } from 'antd';
import { TripHeader } from './TripHeader';
import { LoadingIndicator } from './../LoadingIndicator';
import TripInfo from './TripInfo';
import ItineraryPage from './../itinerary/ItineraryPage';
import BookingsPage from './../bookings/BookingsPage';
import DocumentsPage from './../documents/DocumentsPage';
import StatementPage from './../statement/StatementPage';
import { setActiveTrip } from './../../actions/activeTrip';
import { getActiveTripAssociatedData } from './../../actions/activeTrip';
const TabPane = Tabs.TabPane;

export class TripPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setActiveTrip(this.props.trip);
    this.props.getActiveTripAssociatedData(this.props.trip.trip_id);
  }

  render() {
    if (this.props.activeTrip.loading === undefined || this.props.activeTrip.loading) {
      return (
        <div className="content-area">
          <TripHeader
            tripTitle={this.props.trip.title}
            startDate={this.props.trip.start_date}
            endDate={this.props.trip.end_date}
          />
          <LoadingIndicator size="large" title="Loading Trip" />
        </div>
      );
    }
    return (
      <div className="content-area">
        <TripHeader
          tripTitle={this.props.trip.title}
          startDate={this.props.trip.start_date}
          endDate={this.props.trip.end_date}
        />
        <Tabs>
          <TabPane
            tab={
              <span>
                <Icon type="info-circle-o" /> Info
              </span>
            }
            key="1"
          >
            <TripInfo trip={this.props.trip} />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type="calendar" /> <Badge dot={true}>Itinerary</Badge>
              </span>
            }
            key="2"
          >
            <ItineraryPage />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type="schedule" /> Bookings
              </span>
            }
            key="3"
          >
            <BookingsPage />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="file-pdf" /> Documents
              </span>
            }
            key="4"
          >
            <DocumentsPage />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="credit-card" /> Statement
              </span>
            }
            key="5"
          >
            <StatementPage />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    trip: state.trips.tripsList.find(trip => {
      return trip.trip_id == props.match.params.id;
    }),
    activeTrip: state.activeTrip === undefined ? {} : state.activeTrip,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTrip: trip => dispatch(setActiveTrip(trip)),
    getActiveTripAssociatedData: tripId => dispatch(getActiveTripAssociatedData(tripId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPage);
