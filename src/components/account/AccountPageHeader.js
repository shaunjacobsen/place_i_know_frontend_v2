import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tabs, Icon } from 'antd';
import AccountContactPage from './AccountContactPage';

const TabPane = Tabs.TabPane;

export class AccountPageHeader extends React.Component {
  render() {
    return (
      <div className="account__page">
        <img src={this.props.user.avatar} className="account__header__avatar" />
        <div className="account__header__info">
          <h1>
            {this.props.user.firstName}&nbsp;{this.props.user.lastName}
          </h1>
          <p>Joined {moment(this.props.user.created).fromNow()}</p>
        </div>
        <div className="account__main">
          <Tabs>
            <TabPane
              tab={
                <span>
                  <Icon type="user" />Profile
                </span>
              }
              key={1}
            >
              <AccountContactPage />
            </TabPane>

            <TabPane
              disabled
              tab={
                <span>
                  <Icon type="idcard" />Official Documents
                </span>
              }
              key={2}
            >
              Passport, etc.
            </TabPane>

            <TabPane
              disabled
              tab={
                <span>
                  <Icon type="setting" />Settings
                </span>
              }
              key={3}
            >
              Settings
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AccountPageHeader);
