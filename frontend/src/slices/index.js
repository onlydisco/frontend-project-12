import { configureStore } from '@reduxjs/toolkit';
import channelsInfoReducer from './channelsInfoSlice.js';
import messagesInfoReducer from './messagesInfoSlice.js';
import modalReducer from './modalSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsInfoReducer,
    messagesInfo: messagesInfoReducer,
    modal: modalReducer,
  },
});

export default store;
