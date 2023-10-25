import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import { selectCurrentChannelId } from '../slices/channelsInfoSlice.js';
import { getUsername } from '../helpers/getAuthData';

const socket = io.connect();

const MessagesForm = () => {
  const currentChannelId = useSelector(selectCurrentChannelId);

  const messageInput = useRef(null);

  useEffect(() => {
    messageInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const newMessage = {
          body: values.body,
          username: getUsername(),
          channelId: currentChannelId,
        };
        await socket.emit('newMessage', newMessage);
        messageInput.current.focus();
        resetForm();
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    },
  });

  return (
    <Form
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <InputGroup>
        <Form.Control
          className="border-0 p-0 ps-2"
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={messageInput}
        />
        <Button
          className="border-0 text-primary"
          variant="group-vertical"
          type="submit"
          disabled={formik.isSubmitting || !formik.values.body}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessagesForm;
