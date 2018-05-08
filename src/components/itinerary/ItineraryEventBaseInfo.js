import React from 'react';
import moment from 'moment';
import { Divider, Icon } from 'antd';
import { pluralize } from './../../helpers/stringHelpers';

export class ItineraryEventBaseInfo extends React.Component {
  hasSetStartTime() {
    return this.props.event.start_time && !this.props.event.end_time;
  }

  hasSetStartAndEndTime() {
    return this.props.event.start_time && this.props.event.end_time;
  }

  hasOnlyDuration() {
    return this.props.event.duration;
  }

  humanizeDuration(minutes) {
    if (typeof minutes !== 'number') {
      minutes = Number(minutes);
    }
    // nice, even hours
    if (minutes % 60 === 0) {
      return pluralize(minutes / 60, 'hour');
    } else {
      const remainderMinutes = minutes % 60;
      return (
        pluralize(Math.floor(minutes / 60), 'hour') +
        ' ' +
        pluralize(remainderMinutes, 'minute')
      );
    }
  }

  getPrice(price) {
    if (price === 0) {
      return 'Free';
    } else {
      return price.toLocaleString(
        this.returnJavascriptLocaleCodeFromCurrency(this.props.event.currency),
        { style: 'currency', currency: this.props.event.currency }
      );
    }
  }

  returnJavascriptLocaleCodeFromCurrency(currency) {
    switch (currency) {
      case 'usd':
        return 'en-US';
      case 'cad':
        return 'en-CA';
      case 'gbp':
        return 'en-GB';
      case 'eur':
        return 'en-IE';
      case 'jpy':
        return 'ja-JP';
      case 'dkk':
        return 'da';
      case 'nok':
        return 'no-NO';
      case 'sek':
        return 'sv-se';
      default:
        return 'en-US';
    }
  }

  renderTimeInformation() {
    if (this.hasSetStartTime() && this.props.event.duration) {
      return (
        <div>
          <span className="card__basic-information--red">
            <Icon type="clock-circle-o" /> Arrive by&nbsp;
            {moment.utc(this.props.event.start_time).format('hh:mm a')}
          </span>
          <Divider type="vertical" />
          <span className="card__basic-information--purple">
            <Icon type="clock-circle-o" />&nbsp;
            {this.humanizeDuration(this.props.event.duration)}
          </span>
        </div>
      );
    } else if (this.hasSetStartAndEndTime()) {
      return (
        <div>
          <span className="card__basic-information--red">
            <Icon type="clock-circle-o" />&nbsp;
            {moment.utc(this.props.event.start_time).format('hh:mm a')}&nbsp;&mdash;&nbsp;
            {moment.utc(this.props.event.end_time).format('hh:mm a')}
          </span>
        </div>
      );
    } else if (this.hasOnlyDuration()) {
      return (
        <div>
          <span className="card__basic-information--purple">
            <Icon type="clock-circle-o" />&nbsp;Around&nbsp;
            {this.humanizeDuration(this.props.event.duration)}
          </span>
        </div>
      );
    }
  }

  renderPriceInformation() {
    if (this.props.event.price) {
      return (
        <div>
          <Icon type="credit-card" />&nbsp;{this.props.event.price_is_approximate
            ? 'Around '
            : ''}
          {this.getPrice(this.props.event.price)}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card__basic-information">
        {this.renderTimeInformation()}
        {this.renderPriceInformation()}
      </div>
    );
  }
}
