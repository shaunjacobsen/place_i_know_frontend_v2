import React from 'react';
import moment from 'moment';

export const DateRange = props => {
  const start = moment(props.start);
  const end = moment(props.end);
  const datesAreInSameMonth = start.format('M') === end.format('M');
  {
    if (datesAreInSameMonth) {
      return (
        <span>
          {start.format('D')} &mdash; {end.format('D MMMM')}
        </span>
      );
    } else {
      return (
        <span>
          {start.format('D MMMM')} &mdash; {end.format('D MMMM')}
        </span>
      );
    }
  }
};
