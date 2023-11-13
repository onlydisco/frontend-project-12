import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsInfoSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = {
  messages: messagesAdapter.getInitialState(),
};

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      messagesAdapter.addOne(state.messages, payload);
    },
    addMessages: (state, { payload }) => {
      messagesAdapter.addMany(state.messages, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, { payload }) => {
      const restMessages = Object.values(state.messages.entities).filter(
        (message) => message.channelId !== payload,
      );
      messagesAdapter.setAll(state.messages, restMessages);
    });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messagesInfo.messages,
);
export const selectCurrentChannelMessages = createSelector(
  (state) => state,
  (state) => {
    const { currentChannelId } = state.channelsInfo;
    return Object.values(state.messagesInfo.messages.entities).filter(
      (message) => message.channelId === currentChannelId,
    );
  },
);
export const { actions } = messagesInfoSlice;
export default messagesInfoSlice.reducer;
