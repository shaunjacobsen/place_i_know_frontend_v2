import React from 'react';
import { connect } from 'react-redux';
import { Alert, Icon, Divider, Button, Rate } from 'antd';
import moment from 'moment';
import TrainLeg from './TrainLeg';
import { pluralize } from './../../../helpers/stringHelpers';
import { trainMarkSelected } from './../../../actions/trains';
import { selectElementById } from './../../../selectors/booking';
import { selectPlaceById } from './../../../selectors/place';

export class Train extends React.Component {
  handleTrainSelection = () => {
    this.props.selectTrain(this.props.train.train_id);
  };

  determineCardOrientation() {
    return this.props.train.status.toLowerCase() === 'confirmed'
      ? 'card__content'
      : 'card__content--column';
  }

  displayBookingActions() {
    if (this.props.train.status.toLowerCase() === 'confirmed') {
      return (
        <div className="confirmation-status confirmation-status--confirmed">
          <Icon type="check-circle-o" />&nbsp;<strong>Booked</strong>
        </div>
      );
    } else if (this.props.train.status.toLowerCase() === 'selected') {
      return (
        <div className="confirmation-status confirmation-status--selected">
          <Icon type="check-circle-o" />&nbsp;<strong>Selected</strong>
        </div>
      );
    } else {
      return (
        <div className="confirmation-status confirmation-status--proposed">
          <Button
            type="primary"
            disabled={this.props.isUpdatingTrains}
            loading={this.props.isUpdatingTrains}
            onClick={this.handleTrainSelection}
          >
            {this.props.isUpdatingTrains ? 'Updating...' : 'Select this journey'}
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card__content-column">
          <div className="card__content--text">
            <div className="flight-legs">
              {this.props.legs.map(leg => {
                return <TrainLeg leg={leg} />;
              })}
            </div>
            <Divider />
            <div className="flight-information">
              <span className="price">
                {Number(this.props.train.total).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>&nbsp;<small>
                for {pluralize(this.props.train.passenger_count, 'passenger')}
                <br />incl. tax
              </small>
            </div>
            <Divider />
            <div className="card__actions">{this.displayBookingActions()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const train = selectElementById(
    props.trainId,
    state.activeTrip.trains.data,
    'train_id'
  );
  return {
    train,
    legs: train.train_legs.sort((a, b) => {
      return moment(a.departure_time).unix() > moment(b.departure_time).unix();
    }),
    isUpdatingTrains: state.activeTrip.trains.loadingType === 'refresh' ? true : false,
    isConfirmed: train.status.toLowerCase() === 'confirmed',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTrain: id => dispatch(trainMarkSelected(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
