import React from 'react';
import moment from 'moment';
import { Icon } from 'antd';
import { FlightLegExtraInfo } from './FlightLegExtraInfo';
import { humanizeDuration } from './../../../helpers/time';

export class FlightLeg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreDetails: false,
    };
  }

  handleShowMoreOrLessDetailsClick = () => {
    this.setState(prevState => {
      return {
        showMoreDetails: !prevState.showMoreDetails,
      };
    });
  };

  renderDetailsLink = () => {
    return (
      <button
        className="button button--link"
        onClick={this.handleShowMoreOrLessDetailsClick}
      >
        <Icon type={this.state.showMoreDetails ? 'up' : 'down'} />&nbsp;
        {this.state.showMoreDetails ? 'Fewer' : 'More'} details
      </button>
    );
  };

  render() {
    return (
      <div className="flight-leg">
        <div className="operator-image">
          <img
            src={this.props.leg.operator.image.secure_url}
            alt={this.props.leg.operator.name}
          />
          {this.props.leg.operator.shortcode}&nbsp;{this.props.leg.flight_no}
        </div>
        <div className="flight-leg__information">
          <div className="leg departure">
            <div className="airport-code">{this.props.leg.departure_airport_code}</div>
            <div className="airport-name">{this.props.leg.departure_airport}</div>
            {moment(this.props.leg.departure_time).format('ddd D MMM')}
            <br />
            {moment(this.props.leg.departure_time).format('h:mm a')}
          </div>
          <Icon type="arrow-right" />
          <div className="leg arrival">
            <div className="airport-code">{this.props.leg.arrival_airport_code}</div>
            <div className="airport-name">{this.props.leg.arrival_airport}</div>
            {moment(this.props.leg.arrival_time).format('ddd D MMM')}
            <br />
            {moment(this.props.leg.arrival_time).format('h:mm a')}
          </div>
        </div>
        <div className="duration">
          Flight time:&nbsp;{humanizeDuration(this.props.leg.duration)}
        </div>
        <div style={{ textAlign: 'center' }}>{this.renderDetailsLink()}</div>
        <div>
          <FlightLegExtraInfo
            info={this.props.leg}
            visible={this.state.showMoreDetails}
          />
        </div>
      </div>
    );
  }
}

export default FlightLeg;
