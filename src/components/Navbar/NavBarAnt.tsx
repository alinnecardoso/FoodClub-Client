import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStores';
import { navIconsList } from './NavIconsList';

const NavbarAnt: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const filteredIcons = navIconsList.filter((icon) =>
    icon.iconFor.includes(user.userType)
  );

  const handleClick = ({ key }: { key: string }) => {
    const item = filteredIcons.find((i) => i.link === key);
    if (item?.label === 'Sair') {
      logout();
      navigate(item.link);
    }
  };

  const menuItems = filteredIcons.map(({ id, element, label, link }) => ({
    key: link,
    icon: element,
    label:
      label === 'Sair' ? (
        label
      ) : (
        <Link to={link} style={{ width: '100%', display: 'block' }}>
          {label}
        </Link>
      ),
  }));

  return (
    <div
      style={{
        width: collapsed ? 80 : 200,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        zIndex: 1000,
        paddingTop: 16,
      }}
    >
      <div style={{ padding: '0 16px' }}>
        <Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleClick}
      />
    </div>
  );
};

export default NavbarAnt;
