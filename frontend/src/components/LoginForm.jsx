import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import useAuth from '../hooks/useAuth.js';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username required'),
  password: Yup.string().required('Password required'),
});

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const usernameInput = useRef(null);
  const auth = useAuth();

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      formik.validateForm();

      setAuthFailed(false);

      try {
        const response = await axios.post('/api/v1/login', values);
        auth.logIn(response?.data?.token);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          return;
        }

        console.log(error);
      }
    },
  });

  return (
    <Card>
      <Card.Body className="p-5">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">Войти</h1>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="username" label="Ваш ник">
              <Form.Control
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Ваш ник"
                required
                ref={usernameInput}
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={authFailed}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-4">
            <FloatingLabel controlId="password" label="Пароль">
              <Form.Control
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Пароль"
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={authFailed}
              />
              <Form.Control.Feedback type="invalid">
                Неверное имя пользователя или пароль
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button
            className="w-100 mb-3"
            variant="outline-primary"
            type="submit"
          >
            Войти
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <span>Нет аккаунта? </span>
          <Link to="/signup">Регистрация</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
