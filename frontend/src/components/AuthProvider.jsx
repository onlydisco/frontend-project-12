import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null,
  );

  const authProps = useMemo(() => {
    const logIn = (userData) => {
      const { username, token } = userData;
      if (token) {
        localStorage.setItem('user', JSON.stringify({ token, username }));
        setUser({ username });
        navigate(routes.chatPagePath());
      }
    };

    const logOut = () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate(routes.loginPagePath());
    };

    const getAuthHeader = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData?.token
        ? { Authorization: `Bearer ${userData.token}` }
        : {};
    };

    return {
      user,
      logIn,
      logOut,
      getAuthHeader,
    };
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={authProps}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
