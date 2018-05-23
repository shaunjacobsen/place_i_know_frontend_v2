import React from 'react';
import Document from './Document';

export const DocumentTable = props => {
  return (
    <div>
      {props.documents.map(doc => {
        return (
          <div key={doc.document_id} className="card">
            <Document key={doc.document_id} document={doc} />
          </div>
        );
      })}
    </div>
  );
};
