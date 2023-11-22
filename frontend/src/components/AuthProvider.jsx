import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!user?.token);

  const logIn = (token, username) => {
    if (token) {
      localStorage.setItem('user', JSON.stringify({ token, username }));
      setLoggedIn(true);
      navigate('/');
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
