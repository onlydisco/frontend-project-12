import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  actions as modalActions,
  selectModalForChannelId,
} from '../../slices/modalSlice.js';
import socket from '../../socket.js';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const modalForChannelId = useSelector(selectModalForChannelId);
  const { t } = useTranslation();

  const handleCloseModal = () => {
    dispatch(modalActions.showModal(false));
    dispatch(modalActions.setModalType(null));
    dispatch(modalActions.setModalForChannelId(null));
  };

  const handleRemoveChannel = (channelId) => {
    socket.emit('removeChannel', { id: channelId });
    handleCloseModal();
  };

  return (
    <Modal onHide={handleCloseModal} show centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannelModal.question')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="btn btn-primary mt-2 me-2"
            variant="secondary"
            type="button"
            onClick={handleCloseModal}
          >
            {t('modals.removeChannelModal.buttons.cancel')}
          </Button>
          <Button
            className="btn btn-primary mt-2"
            variant="danger"
            type="button"
            onClick={() => handleRemoveChannel(modalForChannelId)}
          >
            {t('modals.removeChannelModal.buttons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
