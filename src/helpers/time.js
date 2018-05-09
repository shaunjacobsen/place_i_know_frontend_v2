import { pluralize } from './stringHelpers';

export const humanizeDuration = minutes => {
  if (typeof minutes !== 'number') {
    minutes = Number(minutes);
  }
  if (minutes % 60 === 0) {
    return pluralize(minutes / 60, 'hour');
  } else {
    const remainderMinutes = minutes % 60;
    return (
      pluralize(Math.floor(minutes / 60), 'hour') +
      ' ' +
      pluralize(remainderMinutes, 'minute')
    );
  }
};
