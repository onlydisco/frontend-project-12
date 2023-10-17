import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
