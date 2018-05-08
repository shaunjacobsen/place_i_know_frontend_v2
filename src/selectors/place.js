export const selectPlaceById = (placeId, placesList) => {
  return placesList.find(place => {
    return place.place_id === placeId;
  });
};
