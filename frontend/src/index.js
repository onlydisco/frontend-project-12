import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices';

import App from './App.jsx';

import './assets/styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
