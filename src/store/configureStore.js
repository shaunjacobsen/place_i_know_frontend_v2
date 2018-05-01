import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './../reducers/auth';
import tripReducer from './../reducers/trip';
import activeTripReducer from './../reducers/activeTrip';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      trips: tripReducer,
      activeTrip: activeTripReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
