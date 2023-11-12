import React from 'react';
import { useSelector } from 'react-redux';
import AddChanelModal from './AddChanelModal';
import RenameChannelModal from './RenameChannelModal';
import { selectModalType } from '../../slices/modalSlice';

const modals = {
  addChannel: AddChanelModal,
  renameChannel: RenameChannelModal,
};

const getModal = (modalName) => modals[modalName];

const Modal = () => {
  const modalType = useSelector(selectModalType);
  const ModalComponent = getModal(modalType);

  return <ModalComponent />;
};

export default Modal;
