import { useContext } from 'react';
import SocketApiContext from '../contexts/SocketApiContext.js';

const useApiContext = () => {
  const api = useContext(SocketApiContext);
  return api;
};

export default useApiContext;
