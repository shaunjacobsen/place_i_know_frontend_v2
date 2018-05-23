import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { startSignOut } from './../../actions/auth';
import UserInfo from './UserInfo';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  clickMenuIcon = e => {
    e.preventDefault();
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  isActiveNavItem = path => {
    return window.location.pathname.split('/')[1] === path ? 'active' : '';
  };

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
                <span className={this.isActiveNavItem('home')}>
                  <Icon type="home" />&nbsp;Home
                </span>
              </div>
            </Link>
            <Link to="/trips">
              <div className="header__nav-element">
                <span className={this.isActiveNavItem('trip')}>
                  <Icon type="compass" />&nbsp;Trips
                </span>
              </div>
            </Link>
            <Link to="/chat">
              <div className="header__nav-element">
                <span className={this.isActiveNavItem('chat')}>
                  <Icon type="message" />&nbsp;Chat
                </span>
              </div>
            </Link>
          </div>

          <UserInfo />
        </div>
        <div className="header__content-mobile">
          <Link to="/home">
            <img src="/images/logo.png" alt="Place I Know" className="header__logo" />
          </Link>
          <a href="javascript:;" onClick={this.clickMenuIcon}>
            <Icon type={this.state.isMenuOpen ? 'close' : 'ellipsis'} />
          </a>
        </div>
        <div
          className={
            this.state.isMenuOpen ? 'header__nav-mobile' : 'header__nav-mobile collapsed'
          }
        >
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
