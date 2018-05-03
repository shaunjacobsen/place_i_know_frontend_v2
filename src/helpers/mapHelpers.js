export const getLatLngCoordinateList = eventList => {
  return eventList
    .filter(event => {
      return event.type === 'event' && (event.place_lat && event.place_lng);
    })
    .map(event => {
      return {
        dayId: event.day_id,
        eventId: event.event_id,
        lat: event.place_lat,
        lng: event.place_lng,
      };
    });
};

export const getBoundsFromCoordinatesList = coordinatesList => {
  let northWestLat = 0;
  let northWestLng = 180;
  let southEastLat = 90;
  let southEastLng = 0;
  coordinatesList.forEach(coordinate => {
    if (coordinate.lat > northWestLat) {
      northWestLat = coordinate.lat;
    }
    if (coordinate.lng < northWestLng) {
      northWestLng = coordinate.lng;
    }
    if (coordinate.lat < southEastLat) {
      southEastLat = coordinate.lat;
    }
    if (coordinate.lng > southEastLng) {
      southEastLng = coordinate.lng;
    }
  });
  return {
    nw: { lat: northWestLat, lng: northWestLng },
    se: { lat: southEastLat, lng: southEastLng },
  };
};
