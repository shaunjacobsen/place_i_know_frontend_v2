import React from 'react';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import { startSignOut } from './../../actions/auth';

export const UserInfo = props => {
  const signOutButton = (
    <a href="#" onClick={props.startSignOut}>
      Sign out
    </a>
  );
  const popoverContent = (
    <div>
      {signOutButton}
    </div>
  );
  const fullName = props.user.firstName + ' ' + props.user.lastName;
  return (
    <div className="user-info">
      <Popover placement="topLeft" content={popoverContent} title={fullName}>
        <img src={props.user.avatar} alt="avatar image" className="user-info__avatar" />
      </Popover>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startSignOut: () => dispatch(startSignOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
