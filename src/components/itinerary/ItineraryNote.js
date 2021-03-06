import React from 'react';
import { List, Divider } from 'antd';

export const ItineraryNote = props => {
  return (
    <List.Item>
      <div className="card">
        <div className="card__content--text">
          <div className="card__title">{props.note.title}</div>
          <Divider />
          <p>{props.note.body}</p>
        </div>
      </div>
    </List.Item>
  );
};
  