import React from 'react';
import { connect } from 'react-redux';
import { Alert, Icon, Divider, Button, Rate, Row, Col, message } from 'antd';
import moment from 'moment';
import { AccommodationInfo } from './AccommodationInfo';
import { DateRange } from './../../DateRange';
import { accommodationMarkSelected } from './../../../actions/accommodations';
import { selectElementById } from '../../../selectors/booking';
import { selectPlaceById } from '../../../selectors/place';

export class Accommodation extends React.Component {
  handleAccommodationSelection = () => {
    this.props.selectAccommodation(this.props.accommodation.accommodation_id);
  };

  determineCardOrientation() {
    return this.props.accommodation.status.toLowerCase() === 'confirmed'
      ? 'card__content'
      : 'card__content--column';
  }

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
            disabled={this.props.isUpdatingHotels}
            loading={this.props.isUpdatingHotels}
            onClick={this.handleAccommodationSelection}
          >
            {this.props.isUpdatingHotels ? 'Updating...' : 'Select this hotel'}
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <Row gutter={6}>
          <div className={this.determineCardOrientation()}>
            <Col xs={24} sm={this.props.isConfirmed ? 8 : 24}>
              <div className="card__image card__image--full-height">
                <img src={this.props.place.image.secure_url} style={{ width: '100%' }} />
              </div>
            </Col>
            <Col xs={24} sm={this.props.isConfirmed ? 16 : 24}>
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
                <Divider />
                <AccommodationInfo
                  confirmed={this.props.isConfirmed}
                  info={this.props.accommodation}
                  place={this.props.place}
                />
                <Divider />
                <div className="card__actions">{this.displayBookingActions()}</div>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const accommodation = selectElementById(
    props.accommodationId,
    state.activeTrip.accommodations.data,
    'accommodation_id'
  );
  return {
    accommodation,
    place: selectPlaceById(accommodation.place_id, state.activeTrip.places.data),
    isUpdatingHotels:
      state.activeTrip.accommodations.loadingType === 'refresh' ? true : false,
    isConfirmed: accommodation.status === 'confirmed',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectAccommodation: id => dispatch(accommodationMarkSelected(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accommodation);
