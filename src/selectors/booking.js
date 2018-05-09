export const selectElementById = (elementId, list, primaryKey) => {
  return list.find(item => {
    return item[primaryKey] === elementId;
  });
};