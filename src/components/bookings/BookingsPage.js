import React from 'react';
import { connect } from 'react-redux';
import { Alert, Tabs, Icon } from 'antd';
import AccommodationPanel from './accommodations/AccommodationPanel';
import FlightPanel from './flights/FlightPanel';
import TrainPanel from './trains/TrainPanel';
const TabPane = Tabs.TabPane;

export class BookingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  }

  render() {
    return (
      <div>
        <Tabs tabPosition={this.state.width >= 900 ? 'left' : 'top'} defaultActiveKey="1">
          <TabPane tab="Hotels" key="1">
            <Alert
              message="Ready to book?"
              description="Once you've chosen a hotel in each destination, simply click on the checkmark. Your travel planner will place the booking and confirm as soon as possible."
              type="info"
              style={{ margin: '0 0 16px 0' }}
              closable
              showIcon
            />
            <AccommodationPanel />
          </TabPane>
          <TabPane tab="Flights" key="2">
            <FlightPanel />
          </TabPane>
          <TabPane tab="Transportation" key="3">
            <TrainPanel />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default BookingsPage;
