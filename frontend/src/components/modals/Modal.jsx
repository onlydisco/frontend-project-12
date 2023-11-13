import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import { selectModalType } from '../../slices/modalSlice';

const modals = {
  addChannel: AddChannelModal,
  renameChannel: RenameChannelModal,
  removeChannel: RemoveChannelModal,
};

const getModal = (modalName) => modals[modalName];

const Modal = () => {
  const modalType = useSelector(selectModalType);
  const ModalComponent = getModal(modalType);

  return <ModalComponent />;
};

export default Modal;
