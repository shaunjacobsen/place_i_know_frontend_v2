export const showAccommodationsForGroupBasedOnConfirmationStatus = group => {
  if (group.status === 'proposed' || group.status === 'selected') {
    return group.accommodation.sort((a, b) => {
      return a.total < b.total;
    });
  } else if (group.status === 'confirmed') {
    return group.accommodation.filter(accommodation => {
      return accommodation.status.toLowerCase() === 'confirmed';
    });
  }
};
