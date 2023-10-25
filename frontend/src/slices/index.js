import { configureStore } from '@reduxjs/toolkit';
import channelsInfoReducer from './channelsInfoSlice.js';
import messagesInfoReducer from './messagesInfoSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsInfoReducer,
    messagesInfo: messagesInfoReducer,
  },
});

export default store;
