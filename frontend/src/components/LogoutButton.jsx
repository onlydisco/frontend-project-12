import React from 'react';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth';

const LogoutButton = () => {
  const auth = useAuth();

  return (
    <Button onClick={auth.logOut} variant="primary">
      Выйти
    </Button>
  );
};

export default LogoutButton;
