import React, { Component } from 'react';
import { Timeline } from 'antd';

import { ProposedItineraryDay } from './ProposedItineraryDay';

export class ProposedItinerary extends Component {
  render() {
    return (
      <Timeline>
        {this.props.itinerary.proposed_itinerary_days
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(date => (
            <Timeline.Item>
              <ProposedItineraryDay day={date} />
            </Timeline.Item>
          ))}
      </Timeline>
    );
  }
}
