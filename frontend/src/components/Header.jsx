import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import LogoutButton from './LogoutButton';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <header>
      <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Link className="navbar-brand" to="/">
            {t('navbar.logo')}
          </Link>
          {auth.loggedIn && <LogoutButton />}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
