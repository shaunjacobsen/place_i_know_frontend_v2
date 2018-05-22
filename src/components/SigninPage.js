import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { signIn, startSignOut } from './../actions/auth';
import SignInForm from './SignInForm';
import { Alert } from './microcomponents/Alert';

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
              <SignInForm
                onSubmit={this.onSubmit}
                onClickForgotPassword={this.handleClickForgotPassword}
              />
            </div>
          )}
          {this.state.activePage === 'forgotPassword' && <p>Forgot password</p>}
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
