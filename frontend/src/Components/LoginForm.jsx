import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username required'),
  password: Yup.string().required('Password required'),
});

const LoginForm = () => {
  const usernameInput = useRef(null);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      formik.validateForm();
      usernameInput.current.focus();
      console.log(values);
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
                isInvalid={Object.keys(formik.errors).length > 0}
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
                isInvalid={Object.keys(formik.errors).length > 0}
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
          <span>Нет аккаунта?</span>
          {' '}
          <Link to="/signup">Регистрация</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
