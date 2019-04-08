import React from 'react';
import { connect } from 'react-redux';
import { Button, Empty } from 'antd';
import { Alert } from './../microcomponents/Alert';
import { DocumentGroup } from './DocumentGroup';

export class DocumentGroupsList extends React.Component {
  render() {
    if (this.props.error) {
      return (
        <Alert
          type="error"
          title="Error loading documents"
          actions={[<Button onClick={this.props.reload}>Reload</Button>]}
          icon
        >
          There was an error loading the documents list. Please check your Internet
          connection and try again.
        </Alert>
      );
    }
    if (this.props.groups.length > 0) {
      return (
        <div>
          {this.props.groups &&
            this.props.groups.map(documentGroup => {
              return (
                <DocumentGroup
                  key={documentGroup.document_group_id}
                  group={documentGroup}
                />
              );
            })}
        </div>
      );
    } else {
      return <Empty image="/images/plane-empty.png" />;
    }
  }
}

const mapStateToProps = state => ({
  error: state.activeTrip.documentGroups.error,
});

export default connect(mapStateToProps)(DocumentGroupsList);
