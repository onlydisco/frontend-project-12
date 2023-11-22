import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as leoProfanity from 'leo-profanity';
import socket from '../socket.js';
import { selectCurrentChannelId } from '../slices/channelsInfoSlice.js';
// import { actions as messagesActions } from '../slices/messagesInfoSlice.js';
import getAuthData from '../helpers/getAuthData';

const MessagesForm = () => {
  // const dispatch = useDispatch();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { t } = useTranslation();

  // useEffect(() => {
  //   socket.on('newMessage', (messageWithId) => {
  //     dispatch(messagesActions.addMessage(messageWithId));
  //   });

  //   return () => {
  //     socket.off('newMessage');
  //   };
  // }, []);

  const messageInput = useRef(null);

  useEffect(() => {
    messageInput.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);

      try {
        const authData = getAuthData();

        const newMessage = {
          body: leoProfanity.clean(values.body),
          username: authData.username,
          channelId: currentChannelId,
        };
        await socket.emit('newMessage', newMessage, (response) => {
          const { status } = response;
          return status === 'ok'
            ? null
            : toast.error(t('notifications.connectionError'));
        });
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
          aria-label={t('messages.messagesForm.ariaLabel')}
          placeholder={t('messages.messagesForm.placeholder')}
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
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">
            {t('messages.messagesForm.submitHidden')}
          </span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessagesForm;
