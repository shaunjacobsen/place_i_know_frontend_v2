import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './../reducers/auth';
import tripReducer from './../reducers/trip';
import itineraryReducer from './../reducers/itinerary';
import eventsReducer from './../reducers/events';
import daysReducer from './../reducers/days';
import placesReducer from './../reducers/places';
import accommodationGroupsReducer from './../reducers/accommodationGroups';
import accommodationReducer from './../reducers/accommodation';
import mapReducer from './../reducers/map';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      trips: tripReducer,
      activeTrip: {
        itinerary: itineraryReducer,
        events: eventsReducer,
        days: daysReducer,
        places: placesReducer,
        accommodationGroups: accommodationGroupsReducer,
        accommodation: accommodationReducer,
      },
      map: mapReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
