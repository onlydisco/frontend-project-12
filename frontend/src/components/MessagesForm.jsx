import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import { selectCurrentChannelId } from '../slices/channelsInfoSlice.js';
import getAuthData from '../helpers/getAuthData';
import useApi from '../hooks/useApi.js';

const MessagesForm = () => {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { t } = useTranslation();
  const api = useApi();

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
        await api.sendMessage(newMessage);
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
