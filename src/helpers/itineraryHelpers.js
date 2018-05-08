import moment from 'moment';

export const getArrayOfDatesFromItineraryDays = data => {
  let dates = [];
  data.forEach(day => {
    if (!dates.includes(day.date)) {
      dates.push(day.date);
    }
  });
  return dates.sort((a, b) => {
    return moment(a) > moment(b);
  });
};
