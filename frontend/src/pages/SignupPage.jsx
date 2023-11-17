import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignupForm from '../components/SignupForm.jsx';

const SignupPage = () => (
  <Container fluid className="h-100">
    <Row className="h-100 justify-content-center align-content-center">
      <Col xs={12} md={8} xxl={6}>
        <SignupForm />
      </Col>
    </Row>
  </Container>
);

export default SignupPage;
