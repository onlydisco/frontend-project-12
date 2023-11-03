import React from 'react';
import { useSelector } from 'react-redux';
import AddChanelModal from './AddChanelModal';
import { selectModalType } from '../../slices/modalSlice';

const modals = {
  addChannel: AddChanelModal,
};

const getModal = (modalName) => modals[modalName];

const Modal = () => {
  const modalType = useSelector(selectModalType);
  const ModalComponent = getModal(modalType);

  return <ModalComponent />;
};

export default Modal;
