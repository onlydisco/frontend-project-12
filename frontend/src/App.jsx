import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App = () => {
  const page = useRoutes(routes);

  return page;
};

export default App;
