import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Card, Divider, Tabs, Icon, Badge, Modal, Button } from 'antd';
import AttendeesList from './AttendeesList';
import ItineraryPage from './../itinerary/ItineraryPage';
import BookingsPage from './../bookings/BookingsPage';
import { setActiveTrip } from './../../actions/activeTrip';
const TabPane = Tabs.TabPane;

const attendeeInformation = () =>
  Modal.info({
    title: 'Travellers',
    content: (
      <div>
        <p>We only show travellers who have accounts with Place I Know.</p>
        <p>
          Your travel planner may have booked tickets for more travellers than shown
          because the other travellers are not in our system and are not displayed here.
          Your travel planner will always confirm all travellers with you before placing
          bookings, even if they're not shown here. When in doubt, chat with us!
        </p>
        <p>To invite others to your trip, click the + icon.</p>
      </div>
    ),
  });

export class TripPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setActiveTrip(this.props.trip);
  }

  renderTripLength() {
    const lengthInNights = moment(this.props.trip.end_date).diff(
      moment(this.props.trip.start_date),
      'days'
    );
    return lengthInNights > 1 ? `${lengthInNights} nights` : `${lengthInNights} night`;
  }

  render() {
    return (
      <div className="content-area">
        <h1>{this.props.trip.title}</h1>
        <p>
          {moment(this.props.trip.start_date).format('ddd D MMMM YYYY')} &mdash;{' '}
          {moment(this.props.trip.end_date).format('ddd D MMMM YYYY')} ({this.renderTripLength()})
        </p>
        <Tabs>
          <TabPane
            tab={
              <span>
                <Icon type="info-circle-o" /> Info
              </span>
            }
            key="1"
          >
            <Row>
              <Col md={8}>
                <Card
                  title="Who's Going?"
                  extra={
                    <Icon
                      type="info-circle-o"
                      style={{ cursor: 'pointer' }}
                      onClick={attendeeInformation}
                    />
                  }
                >
                  <AttendeesList
                    tripId={this.props.trip.trip_id}
                    attendees={this.props.trip.attendees}
                  />
                </Card>
              </Col>
            </Row>
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
            <div>DocumentsPage</div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="credit-card" /> Statement
              </span>
            }
            key="5"
          >
            <div>StatementPage</div>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTrip: trip => dispatch(setActiveTrip(trip)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPage);
