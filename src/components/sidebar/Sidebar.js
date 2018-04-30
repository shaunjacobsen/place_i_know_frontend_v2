import React from 'react';
import { Menu } from 'antd';
import { SidebarNavItem } from './SidebarNavItem';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img src="/images/logo_white.png" alt="Place I Know" className="sidebar__logo" />
      </div>
      <Menu>
        <Menu.Item>Home</Menu.Item>
      </Menu>
    </div>
  );
};
