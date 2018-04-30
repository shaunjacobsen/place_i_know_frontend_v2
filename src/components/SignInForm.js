import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

export default class SignInForm extends React.Component {
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
      <Form className="form" onSubmit={this.handleSubmit}>
        {this.state.error && <p>{this.state.error}</p>}
        <FormItem>
          <Input
            prefix={<Icon type="user" />}
            placeholder="Email Address"
            onChange={this.handleChange}
            name="email"
            type="email"
            autofocus
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
    );
  }
}
