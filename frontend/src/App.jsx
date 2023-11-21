import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './components/AuthProvider';
import routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const page = useRoutes(routes);

  return (
    <AuthProvider>
      {page}
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
