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
        {this.state.showMoreDetails ? 'Fewer' : 'More'} details{' '}
        <Icon type={this.state.showMoreDetails ? 'up' : 'down'} />
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
          <Col xs={24} sm={12}>
            <h4>Room Info</h4>
            {this.renderEnglishPluralization(this.props.info.guests, 'guest')}
            <br />
            {this.renderEnglishPluralization(this.props.info.rooms, 'room')}
            <br />
            {this.renderEnglishPluralization(this.props.info.beds, 'bed')}
          </Col>
          <Col xs={24} sm={12}>
            <h4>Cost</h4>
            {Number(this.props.info.total).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            total <small style={{ fontStyle: 'italic' }}>incl. tax</small>
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
        </Row>
        {this.renderDetailsLink()}
        <AccommodationExtraInfo
          info={this.props.info}
          visible={this.state.showMoreDetails}
        />
      </div>
    );
  }
}
