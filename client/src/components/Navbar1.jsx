import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/userStore';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Navbar.css'; // 确保正确导入 UnoCSS 或自定义样式

const Navbar1 = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('确定退出？')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">首页</Link>
        </li>
        <li
          className={
            location.pathname.startsWith('/categories') ? 'active' : ''
          }
        >
          <Link to="/categories">分类</Link>
        </li>
        <li className={location.pathname.startsWith('/notes') ? 'active' : ''}>
          <Link to="/notes">笔记</Link>
        </li>
      </ul>

      <div className="user-info">
        {user ? (
          <div onClick={handleLogout}>
            {user.avatar_url ? (
              <Avatar src={user.avatar_url} />
            ) : (
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: '#87d068' }}
              />
            )}
            <span className="nickname">{user.nickname || user.username}</span>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            登录
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
