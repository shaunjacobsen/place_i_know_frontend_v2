import React from 'react';
import { DocumentGroup } from './DocumentGroup';

export const DocumentGroupsList = props => {
  return (
    <div>
      {props.groups.map(documentGroup => {
        return <DocumentGroup group={documentGroup} />;
      })}
    </div>
  );
};
