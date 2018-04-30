import React from 'react';
import { connect } from 'react-redux';
import { startSignIn, startSignOut } from './../actions/auth';
import SignInForm from './SignInForm';

export class SignInPage extends React.Component {
  onSubmit = data => {
    this.props.startSignIn(data);
  };

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <img
            className="box-layout__header-image"
            src="images/logo.png"
            alt="Place I Know"
          />
          <h1 className="box-layout__title">Welcome</h1>
          <SignInForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startSignIn: data => dispatch(startSignIn(data)),
  };
};

export default connect(undefined, mapDispatchToProps)(SignInPage);
