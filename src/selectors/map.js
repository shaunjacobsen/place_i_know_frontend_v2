import { selectPlaceById } from './place';
import { selectEventById } from './itinerary';

export const getPlaceCoordinatesForEvents = (dayEvents, eventsList, places) => {
  return dayEvents.filter(dayEvent => dayEvent.type === 'event').map(dayEvent => {
    const event = selectEventById(dayEvent.event_id, eventsList);
    const place = selectPlaceById(event.place_id, places);
    return { eventId: event.event_id, lng: place.longitude, lat: place.latitude };
  });
};
