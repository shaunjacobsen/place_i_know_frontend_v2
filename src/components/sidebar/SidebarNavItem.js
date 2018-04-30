import React from 'react';
import { Icon } from 'antd';

export const SidebarNavItem = props => {
  return (
    <li className="sidebar__nav-item">
      <span className="sidebar__nav-item-icon">
        <Icon type={props.icon} />
      </span>
      <span className="sidebar__nav-item-text">{props.title}</span>
    </li>
  );
};
