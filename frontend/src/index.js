import ReactDOM from 'react-dom/client';
import './assets/styles/styles.scss';
import io from 'socket.io-client';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const socket = io();

  root.render(await init(socket));
};

app();
