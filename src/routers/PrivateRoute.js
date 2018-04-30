import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from './../components/header/Header';
import { Sidebar } from './../components/sidebar/Sidebar';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div className="layout">
          <Sidebar />
          <Header />
          <div className="layout-main">
            <div className="layout-container">
              <Component {...props} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.user,
});

export default connect(mapStateToProps)(PrivateRoute);
