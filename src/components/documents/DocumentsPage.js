import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { DocumentGroupsList } from './DocumentGroupsList';
import { getDocumentGroups } from './../../actions/documentGroups';

export class DocumentsPage extends React.Component {
  componentDidMount() {
    this.props.getDocuments(this.props.trip.trip_id);
  }

  render() {
    if (
      this.props.trip.documentGroups === undefined ||
      this.props.trip.documentGroups.loading
    ) {
      return (
        <div>
          <Spin indicator={<Icon type="loading" spin />} /> Loading documents...
        </div>
      );
    }
    return (
      <div>
        <DocumentGroupsList groups={this.props.trip.documentGroups.data} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDocuments: tripId => dispatch(getDocumentGroups(tripId)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    trip: state.activeTrip,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
