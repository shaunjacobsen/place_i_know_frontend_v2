import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { createStructuredSelector } from 'react-redux';
import { signInSuccess, signOut } from './actions/auth';
import registerServiceWorker from './registerServiceWorker';
import { getAuthTokenDetails } from './helpers/signInActions.js';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.css';

export const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

const isUserSignedInOnBrowser = () => {
  const sessionKey = localStorage.getItem('authKey');
  if (sessionKey) {
    return true;
  }
  return false;
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
registerServiceWorker();

const determinePathToRender = authState => {
  if (!!authState.user) {
    renderApp();
    history.push('/signin');
  } else if (!authState.user && isUserSignedInOnBrowser()) {
    renderApp();
    // TODO remove this line after adding more routes
    console.log('should not appear a lot');
    const authKey = localStorage.getItem('authKey');
    getAuthTokenDetails(authKey).then((user) => {
      store.dispatch(signInSuccess(user, authKey));
      history.push('/home');
    }).catch(() => {
      store.dispatch(signOut());
      history.push('/signin');
    });
  } else {
    renderApp();
    history.push('/');
  }
};

determinePathToRender(store.getState().auth);
