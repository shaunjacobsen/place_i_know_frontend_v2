import React from 'react';
import { List } from 'antd';

export class ItineraryDirections extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDirectionMode = () => {
    switch (this.props.directions.suggested_mode) {
      case 'walking':
        return 'Walk';
      case 'transit':
        return 'Public Transit';
      case 'bicycling':
        return 'Bike';
      case 'driving':
        return 'Taxi/Drive';
      default:
        return 'Go';
    }
  };
  render() {
    return (
      <List.Item>
        <div>
          {this.renderDirectionMode()} for about{' '}
          {this.props.directions.estimated_duration} minutes
        </div>
      </List.Item>
    );
  }
}
