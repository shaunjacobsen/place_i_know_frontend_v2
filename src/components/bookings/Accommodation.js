import React from 'react';
import { connect } from 'react-redux';
import { Alert, Icon, Divider, Button, Rate } from 'antd';
import moment from 'moment';
import { AccommodationInfo } from './AccommodationInfo';
import { accommodationMarkSelected } from './../../actions/activeTrip';

export class Accommodation extends React.Component {
  handleAccommodationSelection = () => {
    this.props.selectAccommodation(this.props.info.accommodation_id);
  };

  displayBookingActions() {
    if (this.props.info.status.toLowerCase() === 'confirmed') {
      return (
        <div className="confirmation-status confirmation-status--confirmed">
          <Icon type="check-circle-o" />&nbsp;<strong>Booked</strong>
        </div>
      );
    } else if (this.props.info.status.toLowerCase() === 'selected') {
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
            loading={this.props.isUpdating}
            onClick={this.handleAccommodationSelection}
          >
            Select this hotel
          </Button>
        </div>
      );
    }
  }

  displayCheckInAndCheckOut() {
    const checkIn = moment(this.props.info.check_in);
    const checkOut = moment(this.props.info.check_out);
    const datesAreInSameMonth = checkIn.format('M') === checkOut.format('M');
    if (datesAreInSameMonth) {
      return (
        <span>
          {checkIn.format('D')} &mdash; {checkOut.format('D MMMM')}
        </span>
      );
    } else {
      return (
        <span>
          {checkIn.format('D MMMM')} &mdash; {checkOut.format('D MMMM')}
        </span>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card__content--column">
          <div className="card__image">
            <img
              src={this.props.info.place.image.secure_url}
              style={{ width: '100%', height: '175px' }}
            />
          </div>
          <div className="card__content--text">
            <div className="card__title">{this.props.info.place.name}</div>
            <Rate
              disabled
              defaultValue={this.props.info.star_rating}
              style={{ color: '#85e1c8' }}
            /><br />
            {this.displayCheckInAndCheckOut()}
            <Divider style={{ margin: '12px 0' }} />
            <AccommodationInfo info={this.props.info} />
            <Divider style={{ margin: '12px 0' }} />
            <div className="card__actions">{this.displayBookingActions()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUpdating: state.activeTrip.bookings.accommodations.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectAccommodation: id => dispatch(accommodationMarkSelected(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accommodation);
