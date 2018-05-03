import axios from 'axios';
import { store } from './../index';
import {
  getLatLngCoordinateList,
  getBoundsFromCoordinatesList,
} from './../helpers/mapHelpers';

export const mapLoadPoints = () => {
  return (dispatch, getState) => {
    const activeDate = getState().activeTrip.itinerary.activeDate;
    const activeDateEvents = getState().activeTrip.itinerary.dates[activeDate];
    const points = getLatLngCoordinateList(activeDateEvents);
    dispatch(mapSetPoints(points));
    dispatch(mapLoadBounds(points));
  };
};

export const mapLoadBounds = points => {
  return (dispatch, getState) => {
    const bounds = getBoundsFromCoordinatesList(points);
    dispatch(mapSetBounds(bounds));
  };
};

export const mapSetBounds = bounds => {
  return {
    type: 'MAP_SET_BOUNDS',
    bounds,
  };
};

export const mapSetPoints = points => {
  return {
    type: 'MAP_SET_POINTS',
    points,
  };
};
