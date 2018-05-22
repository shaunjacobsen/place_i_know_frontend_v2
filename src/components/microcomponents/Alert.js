import React from 'react';
import { Icon } from 'antd';

const determineAlertType = type => {
  switch (type) {
    case 'error':
      return { class: 'alert alert--error', icon: 'exclamation-circle-o' };
    case 'warning':
      return { class: 'alert alert--warning', icon: 'warning' };
    case 'success':
      return { class: 'alert alert--success', icon: 'check-circle-o' };
    case 'primary':
      return { class: 'alert alert--primary', icon: 'info-circle-o' };
    default:
      return { class: 'alert alert--primary', icon: 'info-circle-o' };
  }
};

export const Alert = props => {
  return (
    <div className={determineAlertType(props.type).class}>
      {props.icon && (
        <div className="alert__icon">
          <Icon type={determineAlertType(props.type).icon} />
        </div>
      )}
      <div className="alert__body">
        <div className="alert__title">
          <span>{props.title}</span>
        </div>
        <div className="alert__text">{props.children}</div>
        <div className="alert__actions">
          {props.actions && props.actions.map(action => {
            return <div className="alert__action">{action}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
