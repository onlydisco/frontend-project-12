import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="h-100 justify-content-center align-content-center">
      <Col xs={12} sm={8} md={8} lg={6} xl={5} xxl={4}>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
