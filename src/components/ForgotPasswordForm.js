import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Alert } from './microcomponents/Alert';
const FormItem = Form.Item;

export class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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

    if (!this.state.email) {
      this.setState(() => ({ error: 'Please enter your email address.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        email: this.state.email,
      });
    }
  };

  render() {
    return (
      <div>
        <p>
          Please enter your email address below. If you have an account with Place I Know,
          we will send you an email containing a link to reset your password. Please allow
          up to 5 minutes for this email to arrive.
        </p>
        <Form className="form" onSubmit={this.handleSubmit}>
          {this.state.error && (
            <Alert type="error" title="Fields missing" icon>
              {this.state.error}
            </Alert>
          )}
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            Request new password
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
