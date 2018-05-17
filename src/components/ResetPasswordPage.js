import React from 'react';
import axios from 'axios';
import AppRouter, { history } from './../routers/AppRouter';
import { signIn, startSignOut } from './../actions/auth';
import ResetPasswordForm from './ResetPasswordForm';

export class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      networkError: '',
    };
  }

  onSubmit = async data => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/reset_password/${this.props.match.params.resetId}/${
        this.props.match.params.tokenId
      }`,
      {
        new_password: data.password,
      }
    );
    if (resp.status === 200) {
      history.push('/signin');
    } else {
      this.setState(() => ({ networkError: resp.body.error }));
    }
  };

  render() {
    return (
      <div className="box-layout signin-page">
        <div className="box-layout__box">
          <img
            className="box-layout__header-image"
            src="/images/logo.png"
            alt="Place I Know"
          />
          <h1 className="box-layout__title">Reset Your Password</h1>
          <ResetPasswordForm
            onSubmit={this.onSubmit}
            networkError={this.state.networkError}
          />
        </div>
      </div>
    );
  }
}

export default ResetPasswordPage;
