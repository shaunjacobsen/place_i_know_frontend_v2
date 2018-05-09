import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'antd';
import { FlightLegExtraInfo } from './FlightLegExtraInfo';
import { selectPlaceById } from './../../../selectors/place';
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
            <div className="airport-name">{this.props.departurePlace.name}</div>
            {moment(this.props.leg.departure_time).format('ddd D MMM')}
            <br />
            {moment(this.props.leg.departure_time).format('h:mm a')}
          </div>
          <Icon type="arrow-right" />
          <div className="leg arrival">
            <div className="airport-code">{this.props.leg.arrival_airport_code}</div>
            <div className="airport-name">{this.props.arrivalPlace.name}</div>
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

const mapStateToProps = (state, props) => {
  return {
    departurePlace: selectPlaceById(
      props.leg.departure_place_id,
      state.activeTrip.places.data
    ),
    arrivalPlace: selectPlaceById(
      props.leg.arrival_place_id,
      state.activeTrip.places.data
    ),
  };
};

export default connect(mapStateToProps)(FlightLeg);
