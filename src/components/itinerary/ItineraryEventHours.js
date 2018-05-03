import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import { capitalizeFirstLetter } from './../../helpers/stringHelpers';

const weekdaySorter = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export class ItineraryEventHours extends React.Component {
  constructor(props) {
    super(props);
  }

  convertHoursObjectToArray(hoursObject) {
    let hoursArray = [];
    Object.keys(hoursObject).forEach(hour => {
      hoursArray.push({ day: hour, hours: hoursObject[hour] });
    });
    return hoursArray;
  }

  toTwelveHourTime(time) {
    return moment(time, 'HH:mm').format('hh:mm a');
  }

  renderHours(hours) {
    if (hours[0] === '00:00' && hours[1] === '23:59') {
      return '24 hr';
    } else if (hours.length === 2) {
      return `${this.toTwelveHourTime(hours[0])} - ${this.toTwelveHourTime(hours[1])}`;
    } else if (hours.length === 4) {
      return `${this.toTwelveHourTime(hours[0])} - ${this.toTwelveHourTime(
        hours[1]
      )}, ${this.toTwelveHourTime(hours[2])} - ${this.toTwelveHourTime(hours[3])}`;
    }
  }

  renderHoursList() {
    const dateOfEvent = moment(this.props.eventDate).weekday();
    const hours = this.props.hours;
    const days = this.convertHoursObjectToArray(hours);
    return days
      .sort((a, b) => {
        return weekdaySorter[a.day] > weekdaySorter[b.day];
      })
      .map(day => (
        <Row key={day.day}>
          <Col span={6}>{capitalizeFirstLetter(day.day)}</Col>
          <Col span={18}>{this.renderHours(day.hours)}</Col>
        </Row>
      ));
  }

  render() {
    return <div>{this.renderHoursList()}</div>;
  }
}
