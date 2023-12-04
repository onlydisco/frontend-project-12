/* eslint-disable no-param-reassign */

import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.isOpened = true;
      state.type = type;
      state.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const selectOpenModal = createSelector(
  (state) => state.modal.isOpened,
  (isOpened) => isOpened,
);
export const selectModalForChannelId = createSelector(
  (state) => state.modal.extra.channelId,
  (channelId) => channelId,
);
export const selectModalType = createSelector(
  (state) => state.modal.type,
  (type) => type,
);
export const { actions } = modalSlice;
export default modalSlice.reducer;
