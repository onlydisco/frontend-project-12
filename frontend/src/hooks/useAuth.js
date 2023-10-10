import { useContext } from 'react';
import authContext from '../contexts/AuthContext.js';

const useAuth = () => useContext(authContext);

export default useAuth;
