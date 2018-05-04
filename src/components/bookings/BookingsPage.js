import React from 'react';
import { Alert, Collapse, Icon } from 'antd';
import AccommodationGroupList from './AccommodationGroupList';
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
          <Panel header={<h2>Accommodation</h2>} key="1">
            <Alert
              message="Ready to book?"
              description="Once you've chosen a hotel in each destination, simply click on the checkmark. Your travel planner will place the booking and confirm as soon as possible."
              type="info"
              style={{ margin: '0 0 16px 0' }}
              closable
              showIcon
            />
            <AccommodationGroupList />
          </Panel>
          <Panel header={<h2>Flights</h2>} key="2">
            <div />
          </Panel>
          <Panel header={<h2>Train/Bus</h2>} key="3">
            <div />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default BookingsPage;
