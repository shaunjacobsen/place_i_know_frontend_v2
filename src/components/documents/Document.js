import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Spin, Icon, Divider, Tooltip, Modal } from 'antd';

export class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingDownload: false,
    };
    this.handleDownload = this.handleDownload.bind(this);
  }

  async handleDownload() {
    this.setState(() => ({
      isFetchingDownload: true,
    }));
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/${
          this.props.document.document_id
        }/download`,
        {
          headers: { 'x-auth': this.props.authToken },
        }
      );
      if (request.status === 200 && request.data.download_url) {
        window.open(request.data.download_url);
        this.setState(() => ({
          isFetchingDownload: false,
        }));
      }
    } catch (e) {
      this.setState(() => ({
        isFetchingDownload: false,
      }));
      Modal.error({
        title: 'Error downloading document',
        content: `There was an issue downloading ${
          this.props.document.title
        } from the server. Please try again or contact your travel planner.`,
      });
    }
  }

  handleShare() {}

  render() {
    return (
      <div className="card__content card__content--text document__data">
        <div className="document__title">
          <Icon type="file-pdf" />&nbsp;{this.props.document.title}
        </div>
        <div className="document__metadata">
          uploaded {moment(this.props.document.created).fromNow()}
        </div>
        <div className="document__actions">
          <Divider type="vertical" />
          <Tooltip title="Download">
            <button className="button button--link" onClick={this.handleDownload}>
              {this.state.isFetchingDownload ? (
                <Spin indicator={<Icon type="loading" spin />} />
              ) : (
                <Icon type="download" />
              )}
            </button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Share">
            <button className="button button--link" onClick={this.handleShare}>
              <Icon type="export" />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
  };
};

export default connect(mapStateToProps)(Document);
