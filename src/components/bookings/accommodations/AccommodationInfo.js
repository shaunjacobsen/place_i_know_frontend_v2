import React from 'react';
import moment from 'moment';
import { Row, Col, Icon } from 'antd';
import { AccommodationExtraInfo } from './AccommodationExtraInfo';

export class AccommodationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreDetails: false,
    };
  }

  getNumberOfNights() {
    const checkOut = moment(this.props.info.check_out).startOf('day');
    const checkIn = moment(this.props.info.check_in).startOf('day');
    return checkOut.diff(checkIn, 'days');
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

  renderEnglishPluralization(int, word) {
    if (int === 1) {
      return `${int} ${word}`;
    } else {
      return `${int} ${word}s`;
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={24} sm={this.props.confirmed ? 8 : 12}>
            <h4>Room Info</h4>
            {this.renderEnglishPluralization(this.props.info.guests, 'guest')}
            <br />
            {this.renderEnglishPluralization(this.props.info.rooms, 'room')}
            <br />
            {this.renderEnglishPluralization(this.props.info.beds, 'bed')}
          </Col>
          <Col xs={24} sm={this.props.confirmed ? 8 : 12}>
            <h4>Cost</h4>
            <span className="highlight">
              {Number(this.props.info.total).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}{' '}
              total
            </span>{' '}
            <small style={{ fontStyle: 'italic' }}>incl. tax</small>
            <br />
            {this.getNumberOfNights() > 1 && (
              <small>
                {(this.props.info.total / this.getNumberOfNights()).toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}&nbsp;/&nbsp;night, average
              </small>
            )}
          </Col>
          {this.props.confirmed && (
            <Col xs={24} sm={this.props.confirmed ? 8 : 12}>
              <h4>Check In & Out</h4>
              <p>
                Check in starts at {moment(this.props.info.check_in).format('h:mm a')}.<br />
                Check out by {moment(this.props.info.check_out).format('h:mm a')}.
              </p>
            </Col>
          )}
        </Row>
        {this.renderDetailsLink()}
        <AccommodationExtraInfo
          info={this.props.info}
          place={this.props.place}
          visible={this.state.showMoreDetails}
        />
      </div>
    );
  }
}
