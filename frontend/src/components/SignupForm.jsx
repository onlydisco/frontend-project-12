import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth.js';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username required')
    .min(3, 'Must be 3 characters or more')
    .max(20, 'Must be 20 characters or less'),
  password: Yup.string()
    .required('Password required')
    .min(6, 'Must be 6 characters or more'),
  confirmPassword: Yup.string()
    .required('Password confirm required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignupForm = () => {
  const [signupFailed, setSignupFailed] = useState(false);

  const auth = useAuth();

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async (values, { validateForm, setSubmitting }) => {
      setSubmitting(true);
      validateForm();
      try {
        const requestBody = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post('/api/v1/signup', requestBody);
        auth.logIn(response?.data?.token, response?.data?.username);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setSignupFailed(true);
        }
        console.log(error);
      }
    },
  });

  return (
    <Card className="rounded shadow">
      <Card.Body className="p-5">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">Регистрация</h1>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="username" label="Имя пользователя">
              <Form.Control
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Ваш ник"
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
            <FloatingLabel controlId="password" label="Пароль">
              <Form.Control
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Пароль"
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
              label="Подтвердите пароль"
            >
              <Form.Control
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Подтвердите пароль"
                required
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                isInvalid={formik.errors.confirmPassword || signupFailed}
              />
              <Form.Control.Feedback type="invalid">
                {signupFailed
                  ? 'Такой пользователь уже существует'
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
            Зарегистрироваться
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignupForm;
