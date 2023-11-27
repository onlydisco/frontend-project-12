import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './components/AuthProvider';
import Layout from './components/Layout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import routes from './routes.js';

const pageRoutes = [
  {
    path: routes.chatPagePath(),
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        ),
      },
      {
        path: routes.loginPagePath(),
        element: <LoginPage />,
      },
      {
        path: routes.signupPagePath(),
        element: <SignupPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const App = () => {
  const page = useRoutes(pageRoutes);

  return (
    <AuthProvider>
      {page}
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
