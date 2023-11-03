import React, { useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { channelsSelectors } from '../../slices/channelsInfoSlice.js';
import socket from '../../socket.js';

const AddChannelSchema = (channelsNames) => Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(3, 'Must be 3 characters or more')
    .max(20, 'Must be 20 characters or less')
    .notOneOf(channelsNames, 'Must be unique'),
});

const AddChanelModal = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectEntities);
  const channelsNames = Object.values(channels).map((channel) => channel.name);

  const channelNameInput = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      channelNameInput.current.focus();
    }, 1);
  }, []);

  const handleCloseModal = () => {
    dispatch(modalActions.showModal(false));
    dispatch(modalActions.setModalType(false));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: AddChannelSchema(channelsNames),
    onSubmit: async (values, { validateForm, setSubmitting }) => {
      setSubmitting(true);
      validateForm();
      try {
        const newChannel = {
          name: values.name,
          removable: true,
        };
        await socket.emit('newChannel', newChannel);
        handleCloseModal();
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    },
  });

  return (
    <Modal onHide={handleCloseModal} show centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="name"
              name="name"
              type="text"
              autoComplete="new-channel"
              ref={channelNameInput}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
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
              Отменить
            </Button>
            <Button
              className="btn btn-primary mt-2"
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChanelModal;
