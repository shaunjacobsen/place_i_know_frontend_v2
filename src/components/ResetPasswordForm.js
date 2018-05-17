import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Icon, Input, Button, Spin } from 'antd';
const FormItem = Form.Item;

export class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirm_password: '',
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

    if (!this.state.password || !this.state.confirm_password) {
      this.setState(() => ({ error: 'Please fill out both fields.' }));
    } else if (this.state.password !== this.state.confirm_password) {
      this.setState(() => ({ error: 'Passwords do not match.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        password: this.state.password,
      });
    }
  };

  render() {
    const formItemLayout = {
      labelCol: { xs: { span: 24 } },
      wrapperCol: { xs: { span: 24 } },
    };

    return (
      <Spin spinning={this.props.loading}>
        {!!this.state.error && <Alert message={this.state.error} type="error" showIcon />}
        {!!this.props.networkError && (
          <Alert message={this.props.networkError} type="error" showIcon />
        )}
        <Form className="form" onSubmit={this.handleSubmit} layout="vertical">
          <FormItem {...formItemLayout} label="New password">
            <Input
              prefix={<Icon type="lock" />}
              placeholder="Password"
              onChange={this.handleChange}
              name="password"
              type="password"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm password">
            <Input
              label="Confirm password"
              prefix={<Icon type="lock" />}
              placeholder="Password"
              onChange={this.handleChange}
              name="confirm_password"
              type="password"
            />
          </FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Reset Password
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

export default connect(mapStateToProps)(ResetPasswordForm);
