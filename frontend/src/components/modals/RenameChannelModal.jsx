import React, { useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import {
  actions as modalActions,
  selectModalForChannelId,
} from '../../slices/modalSlice.js';
import { channelsSelectors } from '../../slices/channelsInfoSlice.js';
import useApi from '../../hooks/useApi.js';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectEntities);
  const channelsNames = Object.values(channels).map((channel) => channel.name);
  const modalForChannelId = useSelector(selectModalForChannelId);
  const channelToRename = Object.values(channels).find(
    (channel) => channel.id === modalForChannelId,
  );
  const { t } = useTranslation();
  const api = useApi();

  const channelRenameInput = useRef(null);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  useEffect(() => {
    setTimeout(() => {
      channelRenameInput.current.focus();
      channelRenameInput.current.select();
    }, 1);
  }, []);

  const RenameChannelSchema = Yup.object().shape({
    name: Yup.string()
      .required('modals.renameChannelModal.validation.required')
      .min(3, 'modals.renameChannelModal.validation.min')
      .max(20, 'modals.renameChannelModal.validation.max')
      .notOneOf(channelsNames, 'modals.renameChannelModal.validation.notOneOf'),
  });

  const formik = useFormik({
    initialValues: {
      name: channelToRename.name,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: RenameChannelSchema,
    onSubmit: async (values) => {
      try {
        const newChannel = {
          id: modalForChannelId,
          name: leoProfanity.clean(values.name),
        };
        await api.renameChannel(newChannel);
        toast.success(t('notifications.channelRenamed'));
        handleCloseModal();
      } catch (error) {
        console.error(error);
        toast.error(t('notifications.connectionError'));
      }
    },
  });

  return (
    <Modal onHide={handleCloseModal} show centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modals.renameChannelModal.labelHidden')}
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="name"
              name="name"
              type="text"
              autoComplete="new-channel"
              required
              ref={channelRenameInput}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              className="btn btn-primary mt-2 me-2"
              variant="secondary"
              type="button"
              disabled={formik.isSubmitting}
              onClick={handleCloseModal}
            >
              {t('modals.renameChannelModal.buttons.cancel')}
            </Button>
            <Button
              className="btn btn-primary mt-2"
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.renameChannelModal.buttons.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
