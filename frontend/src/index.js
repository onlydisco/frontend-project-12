import ReactDOM from 'react-dom/client';
import './assets/styles/styles.scss';
import init from './init.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init());
};

app();
