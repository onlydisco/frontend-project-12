import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const { t } = useTranslation();

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(
      t('loginForm.username.validation.required'),
    ),
    password: Yup.string().required(
      t('loginForm.password.validation.required'),
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: async (values, { validateForm, setSubmitting }) => {
      setSubmitting(true);
      validateForm();
      setAuthFailed(false);
      try {
        const response = await axios.post(
          process.env.REACT_APP_LOGIN_URL,
          values,
        );
        auth.logIn(response?.data?.token, response?.data?.username);
      } catch (error) {
        console.error(error);
        setSubmitting(false);

        if (!error.isAxiosError) {
          toast.error(t('notifications.unknownError'));
          return;
        }

        if (error.response?.status === 401) {
          setAuthFailed(true);
          usernameInput.current.select();
        } else {
          toast.error(t('notifications.connectionError'));
        }
      }
    },
  });

  return (
    <Card className="rounded shadow">
      <Card.Body className="p-5">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{t('loginForm.header')}</h1>

          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="username"
              label={t('loginForm.username.placeholder')}
            >
              <Form.Control
                name="username"
                type="text"
                autoComplete="username"
                placeholder={t('loginForm.username.placeholder')}
                required
                ref={usernameInput}
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={authFailed}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-4">
            <FloatingLabel
              controlId="password"
              label={t('loginForm.password.placeholder')}
            >
              <Form.Control
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={t('loginForm.password.placeholder')}
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={authFailed}
              />
              <Form.Control.Feedback type="invalid">
                {t('loginForm.authFailed')}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button
            className="w-100 mb-3"
            variant="outline-primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('loginForm.submit')}
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <span>
            {t('loginForm.footer.question')}
            {' '}
          </span>
          <Link to="/signup">{t('loginForm.footer.link')}</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
