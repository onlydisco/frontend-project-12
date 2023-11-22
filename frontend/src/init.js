import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import store from './slices';
import App from './App.jsx';
import resources from './locales';
import RollbarProvider from './components/RollbarProvider.jsx';
import socket from './socket.js';
import { actions as messagesActions } from './slices/messagesInfoSlice.js';
import { actions as channelsActions } from './slices/channelsInfoSlice.js';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

  socket.on('newMessage', (messageWithId) => {
    store.dispatch(messagesActions.addMessage(messageWithId));
  });
  socket.on('newChannel', (channelWithId) => {
    store.dispatch(channelsActions.setCurrentChannelId(channelWithId.id));
    store.dispatch(channelsActions.addChannel(channelWithId));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(
      channelsActions.renameChannel({ id: channel.id, changes: channel }),
    );
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(channelsActions.removeChannel(data.id));
    store.dispatch(channelsActions.setCurrentChannelId(1));
  });

  return (
    <RollbarProvider>
      <Provider store={store}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
