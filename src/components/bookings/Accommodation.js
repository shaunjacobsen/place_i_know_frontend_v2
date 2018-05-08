import React from 'react';
import { connect } from 'react-redux';
import { Alert, Icon, Divider, Button, Rate } from 'antd';
import moment from 'moment';
import { AccommodationInfo } from './AccommodationInfo';
import { DateRange } from './../DateRange';
import { accommodationMarkSelected } from './../../actions/activeTrip';
import { selectAccommodationById } from '../../selectors/accommodation';
import { selectPlaceById } from '../../selectors/place';

export class Accommodation extends React.Component {
  handleAccommodationSelection = () => {
    this.props.selectAccommodation(this.props.accommodation.accommodation_id);
  };

  displayBookingActions() {
    if (this.props.accommodation.status.toLowerCase() === 'confirmed') {
      return (
        <div className="confirmation-status confirmation-status--confirmed">
          <Icon type="check-circle-o" />&nbsp;<strong>Booked</strong>
        </div>
      );
    } else if (this.props.accommodation.status.toLowerCase() === 'selected') {
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
            //disabled={this.props.isUpdating}
            //loading={this.props.isUpdating}
            onClick={this.handleAccommodationSelection}
          >
            {/*this.props.isUpdating ? 'Updating...' : 'Select this hotel'*/}
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card__content--column">
          <div className="card__image">
            <img
              src={this.props.place.image.secure_url}
              style={{ width: '100%', height: '175px' }}
            />
          </div>
          <div className="card__content--text">
            <div className="card__title">{this.props.place.name}</div>
            <Rate
              disabled
              defaultValue={this.props.accommodation.star_rating}
              style={{ color: '#85e1c8' }}
            />
            <br />
            <DateRange
              start={this.props.accommodation.check_in}
              end={this.props.accommodation.check_out}
            />
            <Divider style={{ margin: '12px 0' }} />
            <AccommodationInfo info={this.props.accommodation} place={this.props.place} />
            <Divider style={{ margin: '12px 0' }} />
            <div className="card__actions">{this.displayBookingActions()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const accommodation = selectAccommodationById(
    props.accommodationId,
    state.activeTrip.accommodations.data
  );
  return {
    accommodation,
    place: selectPlaceById(accommodation.place_id, state.activeTrip.places.data),
    //isUpdating: undefined,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectAccommodation: id => dispatch(accommodationMarkSelected(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accommodation);
