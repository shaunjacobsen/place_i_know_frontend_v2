import React, { Component } from 'react';
import { Tabs } from 'antd';
import moment from 'moment';

export class ProposedItineraryDay extends Component {
  render() {
    const { day } = this.props;
    return (
      <div>
        <h4>{moment(day.date).format('dddd D MMMM YYYY')}</h4>
        <h2>{day.title}</h2>
        <p>{day.notes}</p>
      </div>
    );
  }
}
