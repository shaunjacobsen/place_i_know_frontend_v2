import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Divider } from 'antd';
import AccountContactForm from './AccountContactForm';
import UpdateAvatar from './UpdateAvatar';

export class AccountContactPage extends React.Component {
  render() {
    return (
      <div className="account__contact-info">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <h3>
              <Icon type="user" />&nbsp;Personal Information
            </h3>
            <Divider />
            <AccountContactForm />
          </Col>
          <Col xs={24} sm={12}>
            <h3>
              <Icon type="photo" />&nbsp;Avatar
            </h3>
            <Divider />
            <UpdateAvatar />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AccountContactPage;
