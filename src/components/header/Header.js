import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startSignOut } from './../../actions/auth';
import UserInfo from './UserInfo';

export const Header = props => (
  <div className="header">
    <div className="header__content">
      <div className="header__title">
      </div>
      <UserInfo />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    startSignOut: () => dispatch(startSignOut()),
  };
};

export default connect(undefined, mapDispatchToProps)(Header);
