import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'antd';
import { signIn, startSignOut } from './../actions/auth';
import SignInForm from './SignInForm';
import { Alert } from './microcomponents/Alert';
import ForgotPasswordForm from './ForgotPasswordForm';

export class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'signIn',
      email: '',
      message: undefined,
    };
  }

  onSubmit = data => {
    this.props.signIn(data);
  };

  onSubmitForgotPasswordForm = async data => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/forgot_password`,
        {
          email: data.email,
        }
      );
      if (response) {
        this.setState(() => ({
          activePage: 'signIn',
          message: {
            type: 'primary',
            title: 'Password Reset Link Sent',
            body:
              'Please check your email for a link to reset your password. It may take up to 5 minutes for this email to arrive.',
          },
        }));
      }
    } catch (e) {}
  };

  handleClickForgotPassword = e => {
    e.preventDefault();
    this.setState(() => ({
      activePage: 'forgotPassword',
    }));
  };

  handleClickReturnToSignInForm = e => {
    e.preventDefault();
    this.setState(() => ({
      activePage: 'signIn',
    }));
  };

  handleChangeInSignInForm = (name, value) => {
    if (name === 'email') {
      this.setState(() => ({ email: value }));
    }
  };

  renderError = () => {
    if (this.props.error === 401) {
      return (
        <Alert
          type="error"
          title="Problem signing in"
          actions={[
            <Button onClick={this.handleClickForgotPassword}>Forgot password</Button>,
          ]}
          icon
        >
          Please double-check your email address and password and try again.
        </Alert>
      );
    } else if (this.props.error === 400) {
      return (
        <Alert type="error" title="Problem signing in" icon>
          There was an issue signing in. Please try again.
        </Alert>
      );
    } else if (this.props.error === 'NETWORK_ERROR') {
      return (
        <Alert type="error" title="Network error" icon>
          There is an issue establishing a connection to our server. Please try again in a
          moment and ensure that you have a reliable Internet connection.
        </Alert>
      );
    } else {
      return null;
    }
  };

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
            <div>
              {this.renderError()}
              {this.state.message && (
                <Alert
                  type={this.state.message.type}
                  title={this.state.message.title}
                  icon
                >
                  {this.state.message.body}
                </Alert>
              )}
              <SignInForm
                onSubmit={this.onSubmit}
                handleChangeInSignInForm={(name, value) =>
                  this.handleChangeInSignInForm(name, value)
                }
              />
              <button
                onClick={this.handleClickForgotPassword}
                className="button button--link"
                style={{ color: '#666666' }}
              >
                Forgot your password?
              </button>
            </div>
          )}
          {this.state.activePage === 'forgotPassword' && (
            <div>
              <ForgotPasswordForm
                onSubmit={this.onSubmitForgotPasswordForm}
                email={this.state.email}
              />
              <button
                onClick={this.handleClickReturnToSignInForm}
                className="button button--link"
                style={{ color: '#666666' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(signIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
