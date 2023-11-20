import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const LogoutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Button onClick={auth.logOut} variant="primary">
      {t('navbar.logoutButton')}
    </Button>
  );
};

export default LogoutButton;
