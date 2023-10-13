import React, { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import getAuthToken from '../helpers/getAuthToken';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    console.log('fetchData -> response:', response);
  } catch (error) {
    console.log(error);
  }
};

const ChatPage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  return <Container fluid>ChatPage</Container>;
};

export default ChatPage;
