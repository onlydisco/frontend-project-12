import React, { useEffect, useRef, useState } from 'react';
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
import routes from '../routes.js';

const SignupForm = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const { t } = useTranslation();
  const auth = useAuth();

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('signupForm.username.validation.required'))
      .min(3, t('signupForm.username.validation.min'))
      .max(20, t('signupForm.username.validation.max')),
    password: Yup.string()
      .required(t('signupForm.password.validation.required'))
      .min(6, t('signupForm.password.validation.min')),
    confirmPassword: Yup.string()
      .required(t('signupForm.confirmPassword.validation.required'))
      .oneOf(
        [Yup.ref('password'), null],
        t('signupForm.confirmPassword.validation.confirmation'),
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const requestBody = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post(routes.signupPath(), requestBody);
        auth.logIn(response?.data);
      } catch (error) {
        console.error(error);

        if (!error.isAxiosError) {
          toast.error(t('notifications.unknownError'));
          return;
        }

        if (error.response?.status === 409) {
          setSignupFailed(true);
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
          <h1 className="text-center mb-4">{t('signupForm.header')}</h1>

          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="username"
              label={t('signupForm.username.placeholder')}
            >
              <Form.Control
                name="username"
                type="text"
                autoComplete="username"
                placeholder={t('signupForm.username.placeholder')}
                required
                onChange={formik.handleChange}
                value={formik.values.username}
                ref={usernameInput}
                isInvalid={formik.errors.username || signupFailed}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="password"
              label={t('signupForm.password.placeholder')}
            >
              <Form.Control
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder={t('signupForm.password.placeholder')}
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={formik.errors.password || signupFailed}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-4">
            <FloatingLabel
              controlId="confirmPassword"
              label={t('signupForm.confirmPassword.placeholder')}
            >
              <Form.Control
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder={t('signupForm.confirmPassword.placeholder')}
                required
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                isInvalid={formik.errors.confirmPassword || signupFailed}
              />
              <Form.Control.Feedback type="invalid">
                {signupFailed
                  ? t('signupForm.signupFailed')
                  : formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button
            className="w-100 mb-3"
            variant="outline-primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('signupForm.submit')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignupForm;
