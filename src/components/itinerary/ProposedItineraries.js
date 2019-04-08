import React, { Component } from 'react';
import { Tabs } from 'antd';

import { ProposedItinerary } from './ProposedItinerary';

const TabPane = Tabs.TabPane;

export class ProposedItineraries extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey={this.props.itineraries[0].proposed_itinerary_id}
        tabPosition="left"
      >
        {this.props.itineraries
          .filter(pI => pI.status !== 'hidden')
          .sort((a, b) => a.proposed_itinerary_id - b.proposed_itinerary_id)
          .map(itinerary => (
            <TabPane tab={itinerary.title} key={itinerary.proposed_itinerary_id}>
              <ProposedItinerary itinerary={itinerary} />
            </TabPane>
          ))}
      </Tabs>
    );
  }
}
