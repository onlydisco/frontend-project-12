import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Hexlet Chat
        </Link>
        <Button variant="primary">Выйти</Button>
      </div>
    </Navbar>
  </header>
);

export default Header;
