import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import useAuth from '../hooks/useAuth';

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  console.log('ChatPage -> auth:', auth);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (!userId || !userId.token) {
      navigate('/login');
    }
  }, []);

  return <Container fluid>ChatPage</Container>;
};

export default ChatPage;
