import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = {
  channels: channelsAdapter.getInitialState(),
  currentChannelId: null,
};

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      console.log(payload);
      channelsAdapter.addOne(state.channels, payload);
      /* eslint-disable-next-line */
      state.currentChannelId = payload.id;
    },
    addChannels: (state, { payload }) => {
      channelsAdapter.addMany(state.channels, payload);
    },
    setCurrentChannelId: (state, { payload }) => {
      /* eslint-disable-next-line */
      state.currentChannelId = payload;
    },
    renameChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state.channels, payload);
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state.channels, payload);
      /* eslint-disable-next-line */
      state.currentChannelId = 1;
    },
  },
});

export const channelsSelectors = channelsAdapter.getSelectors(
  (state) => state.channelsInfo.channels,
);
export const selectCurrentChannelId = createSelector(
  (state) => state.channelsInfo.currentChannelId,
  (currentChannelId) => currentChannelId,
);
export const selectCurrentChannel = createSelector(
  (state) => state.channelsInfo,
  (channelsInfo) => channelsInfo.channels.entities[channelsInfo.currentChannelId],
);
export const { actions } = channelsInfoSlice;
export default channelsInfoSlice.reducer;
