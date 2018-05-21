import React from 'react';
import { connect } from 'react-redux';
import { signIn, startSignOut } from './../actions/auth';
import SignInForm from './SignInForm';

export class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'signIn',
    };
  }

  onSubmit = data => {
    this.props.signIn(data);
  };

  handleClickForgotPassword = () => {
    this.setState(() => ({
      activePage: 'forgotPassword',
    }));
  }

  render() {
    return (
      <div className="box-layout signin-page">
        <div className="box-layout__box">
          <img
            className="box-layout__header-image"
            src="images/logo.png"
            alt="Place I Know"
          />
          <h1 className="box-layout__title">Welcome</h1>
          {this.state.activePage === 'signIn' && (
            <SignInForm
              onSubmit={this.onSubmit}
              onClickForgotPassword={() => this.handleClickForgotPassword()}
            />
          )}
          {this.state.activePage === 'forgotPassword' && <p>Forgot password</p>}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(signIn(data)),
  };
};

export default connect(undefined, mapDispatchToProps)(SignInPage);
