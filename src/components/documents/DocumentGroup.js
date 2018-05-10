import React from 'react';
import { DocumentTable } from './DocumentTable';

export const DocumentGroup = props => {
  return (
    <div>
      <h2>{props.group.title}</h2>
      <DocumentTable documents={props.group.documents} />
    </div>
  );
};
