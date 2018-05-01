import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Spin } from 'antd';
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
      <Spin spinning={this.props.loading}>
        <Form className="form" onSubmit={this.handleSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          <FormItem>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Email Address"
              onChange={this.handleChange}
              name="email"
              type="email"
              autoFocus
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" />}
              placeholder="Password"
              onChange={this.handleChange}
              name="password"
              type="password"
            />
          </FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign in
          </Button>
        </Form>
      </Spin>
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
