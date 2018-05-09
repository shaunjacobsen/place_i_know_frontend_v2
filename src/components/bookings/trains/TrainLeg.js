import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'antd';
import { TrainLegExtraInfo } from './TrainLegExtraInfo';
import { humanizeDuration } from './../../../helpers/time';
import { selectPlaceById } from '../../../selectors/place';
import { selectElementById } from '../../../selectors/booking';

export class TrainLeg extends React.Component {
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
          {this.props.leg.train_type}&nbsp;{this.props.leg.train_number}
        </div>
        <div className="flight-leg__information">
          <div className="leg departure">
            <div className="airport-code">{this.props.departurePlace.city}</div>
            <div className="airport-name">{this.props.departurePlace.name}</div>
            {moment(this.props.leg.departure_time).format('ddd D MMM')}
            <br />
            {moment(this.props.leg.departure_time).format('h:mm a')}
          </div>
          <Icon type="arrow-right" />
          <div className="leg arrival">
            <div className="airport-code">{this.props.arrivalPlace.city}</div>
            <div className="airport-name">{this.props.arrivalPlace.name}</div>
            {moment(this.props.leg.arrival_time).format('ddd D MMM')}
            <br />
            {moment(this.props.leg.arrival_time).format('h:mm a')}
          </div>
        </div>
        <div className="duration">
          Journey time:&nbsp;{humanizeDuration(this.props.leg.duration)}
        </div>
        <div style={{ textAlign: 'center' }}>{this.renderDetailsLink()}</div>
        <div>
          <TrainLegExtraInfo info={this.props.leg} visible={this.state.showMoreDetails} />
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

export default connect(mapStateToProps)(TrainLeg);
