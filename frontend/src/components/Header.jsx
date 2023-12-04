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
      <Navbar className="shadow-sm bg-white position-static">
        <Container>
          <Link className="navbar-brand focus-ring" to="/">
            {t('navbar.logo')}
          </Link>
          {auth.user && <LogoutButton />}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
