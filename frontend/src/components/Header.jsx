import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LogoutButton from './LogoutButton';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const auth = useAuth();

  return (
    <header>
      <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Link className="navbar-brand" to="/">
            Hexlet Chat
          </Link>
          {auth.loggedIn ? <LogoutButton /> : <Navigate to="/login" />}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
