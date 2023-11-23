import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  modalForChannelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      /* eslint-disable-next-line */
      state.isOpened = payload;
    },
    setModalType: (state, { payload }) => {
      /* eslint-disable-next-line */
      state.type = payload;
    },
    setModalForChannelId: (state, { payload }) => {
      /* eslint-disable-next-line */
      state.modalForChannelId = payload;
    },
  },
});

export const selectOpenModal = createSelector(
  (state) => state.modal.isOpened,
  (isOpened) => isOpened,
);
export const selectModalForChannelId = createSelector(
  (state) => state.modal.modalForChannelId,
  (modalForChannelId) => modalForChannelId,
);
export const selectModalType = createSelector(
  (state) => state.modal.type,
  (type) => type,
);
export const { actions } = modalSlice;
export default modalSlice.reducer;
