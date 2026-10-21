import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <NavLink to="/" end style={{ marginRight: '15px' }}>Trang chủ</NavLink>
      <NavLink to="/tasks" end style={{ marginRight: '15px' }}>Danh sách</NavLink>
      <NavLink to="/tasks/new" end>Thêm mới</NavLink>
    </nav>
  );
};

export default NavBar;