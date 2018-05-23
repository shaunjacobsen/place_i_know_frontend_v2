import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SigninPage from './../components/SigninPage';
import ResetPasswordPage from './../components/ResetPasswordPage';
import DashboardPage from './../components/DashboardPage';
import NotFoundPage from './../components/NotFoundPage';
import TripPage from '../components/trips/TripPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoadingPage from '../components/LoadingPage';
import ChatPage from '../components/chat/ChatPage';
import AccountPage from '../components/account/AccountPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path="/" component={LoadingPage} />
        <PublicRoute exact path="/signin" component={SigninPage} />
        <PublicRoute
          exact
          path="/reset_password/:resetId/:tokenId"
          component={ResetPasswordPage}
        />
        <PrivateRoute exact path="/home" component={DashboardPage} />
        <PrivateRoute exact path="/trips" component={DashboardPage} />
        <PrivateRoute exact path="/chat" component={ChatPage} />
        <PrivateRoute exact path="/account" component={AccountPage} />
        <PrivateRoute exact path="/trip/:id" component={TripPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
