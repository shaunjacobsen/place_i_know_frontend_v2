import React from 'react';
import Attendee from './Attendee';

export const AttendeesList = props => (
  <div>
    {props.attendeees.map(attendee => {
      return <Attendee userId={attendee} />;
    })}
  </div>
);
