import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <div className="h-100 d-flex flex-column">
    <Header />
    <main className="py-4 flex-grow-1">
      <Outlet />
    </main>
  </div>
);

export default Layout;