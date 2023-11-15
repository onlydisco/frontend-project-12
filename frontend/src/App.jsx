import React from 'react';
import { useRoutes } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import routes from './routes';

const App = () => {
  const page = useRoutes(routes);

  return <AuthProvider>{page}</AuthProvider>;
};

export default App;
