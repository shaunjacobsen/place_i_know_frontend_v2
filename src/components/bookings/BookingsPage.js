import React from 'react';
import { connect } from 'react-redux';
import { Alert, Collapse, Icon } from 'antd';
import AccommodationPanel from './AccommodationPanel';
const Panel = Collapse.Panel;

export class BookingsPage extends React.Component {
  render() {
    return (
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          style={{ backgroundColor: 'transparent' }}
        >
          <Panel header={<div className="bookings__header">Accommodation</div>} key="1">
            <Alert
              message="Ready to book?"
              description="Once you've chosen a hotel in each destination, simply click on the checkmark. Your travel planner will place the booking and confirm as soon as possible."
              type="info"
              style={{ margin: '0 0 16px 0' }}
              closable
              showIcon
            />
            <AccommodationPanel />
          </Panel>
          <Panel header={<div className="bookings__header">Flights</div>} key="2">
            <div />
          </Panel>
          <Panel header={<div className="bookings__header">Train/Bus</div>} key="3">
            <div />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default BookingsPage;
