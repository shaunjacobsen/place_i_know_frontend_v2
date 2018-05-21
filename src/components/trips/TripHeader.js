import React from 'react';
import moment from 'moment';

export class TripHeader extends React.PureComponent {
  renderTripLength = () => {
    const lengthInNights = moment(this.props.endDate).diff(
      moment(this.props.startDate),
      'days'
    );
    return lengthInNights > 1 ? `${lengthInNights} nights` : `${lengthInNights} night`;
  };

  render() {
    return (
      <div>
        <h1>{this.props.tripTitle}</h1>
        <p>
          {moment(this.props.startDate).format('ddd D MMMM YYYY')} &mdash;{' '}
          {moment(this.props.endDate).format('ddd D MMMM YYYY')} ({this.renderTripLength()})
        </p>
      </div>
    );
  }
}
