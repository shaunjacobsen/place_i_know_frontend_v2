module.exports = {
  capitalizeFirstLetter: string => string.charAt(0).toUpperCase() + string.slice(1),
  pluralize: (num, unit) => {
    if (num === 1) {
      return `${num} ${unit}`;
    } else {
      return `${num} ${unit}s`;
    }
  },
};
