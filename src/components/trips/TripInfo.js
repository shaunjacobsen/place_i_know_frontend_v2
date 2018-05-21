import React from 'react';
import { Row, Col, Card, Icon, Modal } from 'antd';
import AttendeesList from './AttendeesList';

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
        <p>To invite others to your trip, please contact your travel planner.</p>
      </div>
    ),
  });

export const TripInfo = props => {
  return (
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
          <AttendeesList tripId={props.trip.trip_id} attendees={props.trip.attendees} />
        </Card>
      </Col>
    </Row>
  );
};

export default TripInfo;
