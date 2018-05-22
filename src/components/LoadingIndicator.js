import React from 'react';
import { Spin, Icon } from 'antd';

export class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showReloadLink: false,
    };
  }

  componentDidMount = () => {
    this.startTimer();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  startTimer = () => {
    this.timer = setTimeout(() => {
      this.setState(() => ({ showReloadLink: true }));
    }, 5000);
  };

  reload = () => {
    this.props.reload();
    this.setState(() => ({ showReloadLink: false }));
    clearTimeout(this.timer);
    this.startTimer();
  };

  render() {
    return (
      <div className="loading-indicator">
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: '48px' }} spin />}
          style={{ width: '48px' }}
        />
        <p>{this.props.title}</p>
        {this.state.showReloadLink && (
          <p style={{ fontSize: '12px' }}>
            Hmm, this is taking a little longer than usual...{' '}
            <p>
              <button className="button button--link" onClick={this.reload}>
                Reload?
              </button>
            </p>
          </p>
        )}
      </div>
    );
  }
}
