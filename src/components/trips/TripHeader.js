import React from 'react';
import moment from 'moment';

export const TripHeader = props => {
  const renderTripLength = () => {
    const lengthInNights = moment(props.endDate).diff(
      moment(props.startDate),
      'days'
    );
    return lengthInNights > 1 ? `${lengthInNights} nights` : `${lengthInNights} night`;
  };

  return (
    <div>
      <h1>{props.tripTitle}</h1>
      <p>
        {moment(props.startDate).format('ddd D MMMM YYYY')} &mdash;{' '}
        {moment(props.endDate).format('ddd D MMMM YYYY')} ({renderTripLength()})
      </p>
    </div>
  );
};
