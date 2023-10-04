import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <div className="d-flex flex-column h-100 h-100">
    <Header />
    <main className="h-100">
      <Outlet />
    </main>
  </div>
);

export default Layout;
