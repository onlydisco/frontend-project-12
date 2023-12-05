import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.user ? children : <Navigate to={routes.loginPagePath()} />;
};

export default PrivateRoute;
