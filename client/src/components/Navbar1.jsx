import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/userStore';
import { useThemeStore } from '@/store/themeStore';
import { Avatar, Switch } from 'antd';
import { UserOutlined, BulbOutlined } from '@ant-design/icons';
import './Navbar.css';
import '@/styles/theme.css';

const Navbar1 = () => {
  const { user, logout } = useStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light',
    );
  }, [isDarkMode]);

  // 保留：退出登录处理函数（含确认提示）
  const handleLogout = () => {
    if (window.confirm('确定退出？')) {
      // 清除存储的用户登录信息
      localStorage.removeItem('userId');
      // 调用store中的logout方法（如有其他清理工作）
      logout();
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className={location.pathname === '/home' ? 'active' : ''}>
          <Link to="/home">首页</Link>
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
        <li
          className={
            location.pathname.startsWith('/statistics') ? 'active' : ''
          }
        >
          <Link to="/statistics">统计</Link>
        </li>
      </ul>

      <div className="user-info">
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
          className="theme-switch"
        />
        {user ? (
          // 修改：将点击事件修改为调用含确认退出逻辑的handleLogout
          <div onClick={handleLogout}>
            {user.avatar_url ? (
              <Avatar src={user.avatar_url} />
            ) : (
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1e1e1e' }}
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
