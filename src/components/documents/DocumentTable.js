import React from 'react';
import Document from './Document';

export const DocumentTable = props => {
  return (
    <div>
      {props.documents.map(doc => {
        return (
          <div className="card">
            <Document document={doc} />
          </div>
        );
      })}
    </div>
  );
};
