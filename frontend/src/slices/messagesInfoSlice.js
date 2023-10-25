import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

// const initialState = {
//   messages: messagesAdapter.getInitialState(),
// };

const initialState = {
  messages: {
    ids: [5, 6, 7, 8],
    entities: {
      5: {
        body: 'Сообщение для 1 канала',
        channelId: 1,
        username: 'admin',
        id: 5,
      },
      6: {
        body: 'Сообщение для 1 канала',
        channelId: 1,
        username: 'admin',
        id: 6,
      },
      7: {
        body: 'Сообщение для 2 канала',
        channelId: 2,
        username: 'admin',
        id: 5,
      },
      8: {
        body: 'Сообщение для 2 канала',
        channelId: 2,
        username: 'admin',
        id: 6,
      },
    },
  },
};

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
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
