import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { startSignOut } from './../../actions/auth';
import UserInfo from './UserInfo';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="header__content">
          <Link to="/home">
            <img src="/images/logo.png" alt="Place I Know" className="header__logo" />
          </Link>
          <div className="header__nav">
            <Link to="/home">
              <div className="header__nav-element">
                <span>
                  <Icon type="home" />&nbsp;Home
                </span>
              </div>
            </Link>
            <Link to="/home">
              <div className="header__nav-element">
                <span className="active">
                  <Icon type="compass" />&nbsp;Trips
                </span>
              </div>
            </Link>
            <Link to="/chat">
              <div className="header__nav-element">
                <span>
                  <Icon type="message" />&nbsp;Chat
                </span>
              </div>
            </Link>
          </div>
          <UserInfo />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startSignOut: () => dispatch(startSignOut()),
  };
};

export default connect(undefined, mapDispatchToProps)(Header);
