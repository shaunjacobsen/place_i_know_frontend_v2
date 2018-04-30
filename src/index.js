import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { createStructuredSelector } from 'react-redux';
import { login, logout } from './actions/auth';
import registerServiceWorker from './registerServiceWorker';
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

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
registerServiceWorker();

const determinePathToRender = authState => {
  if (!!authState.user) {
    renderApp();
    console.log('should go to /dashboard');
    history.push('/dashboard');
  } else {
    renderApp();
    console.log('should go to /');
    history.push('/');
  }
};

determinePathToRender(store.getState().auth);

store.subscribe(() => {
  determinePathToRender(store.getState().auth);
});
