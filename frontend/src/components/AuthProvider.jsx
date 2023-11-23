import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!user?.token);

  const authProps = useMemo(() => {
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

    return { loggedIn, logIn, logOut };
  }, [loggedIn, navigate]);

  return (
    <AuthContext.Provider value={authProps}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
