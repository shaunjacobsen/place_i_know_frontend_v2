export const showEventsForDate = (date, dayEvents) => {
  return dayEvents
    .filter(dayEvent => {
      return dayEvent.date === date;
    })
    .sort((a, b) => {
      return a.sort_index - b.sort_index;
    });
};

export const selectEventById = (eventId, eventsList) => {
  return eventsList.find(event => {
    return event.event_id === eventId;
  });
};
