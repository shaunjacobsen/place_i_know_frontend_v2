import React from 'react';
import { Menu } from 'antd';
import { SidebarNavItem } from './SidebarNavItem';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        
      </div>
      <Menu>
        <Menu.Item>Home</Menu.Item>
      </Menu>
    </div>
  );
};
