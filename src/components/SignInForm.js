import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
      error: '',
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
    this.props.handleChangeInSignInForm(name, value);
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: 'Please enter your email and password.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };

  render() {
    return (
      <div>
        <Form className="form" onSubmit={this.handleSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          <FormItem>
            <Input
              prefix={<Icon type="user" />}
              onChange={this.handleChange}
              disabled={this.state.loading}
              placeholder="Email Address"
              name="email"
              type="email"
              autoFocus
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" />}
              onChange={this.handleChange}
              disabled={this.state.loading}
              placeholder="Password"
              name="password"
              type="password"
            />
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading || false,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps)(SignInForm);
