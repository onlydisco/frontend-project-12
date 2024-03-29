import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const { t } = useTranslation();

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response?.data);
      } catch (error) {
        console.error(error);

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
              {authFailed && (
                <Form.Control.Feedback type="invalid">
                  {t('loginForm.authFailed')}
                </Form.Control.Feedback>
              )}
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
          <Link to={routes.signupPagePath()}>{t('loginForm.footer.link')}</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
