import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    user ? { username: user.username } : null,
  );

  const authProps = useMemo(() => {
    const logIn = (token, username) => {
      if (token) {
        localStorage.setItem('user', JSON.stringify({ token, username }));
        setLoggedIn({ username });
        navigate('/');
      }
    };

    const logOut = () => {
      localStorage.removeItem('user');
      setLoggedIn(null);
      navigate('/login');
    };

    const getAuthHeader = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData?.token
        ? { Authorization: `Bearer ${userData.token}` }
        : {};
    };

    return {
      loggedIn, logIn, logOut, getAuthHeader,
    };
  }, [loggedIn, navigate]);

  return (
    <AuthContext.Provider value={authProps}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
