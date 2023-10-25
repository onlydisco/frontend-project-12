import React, { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsInfoSlice.js';
import { actions as messagesActions } from '../slices/messagesInfoSlice.js';
import { getAuthToken } from '../helpers/getAuthData';
import ChannelsContainer from '../components/ChannelsContainer.jsx';
import MessagesContainer from '../components/MessagesContainer.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        const { channels, messages, currentChannelId } = response.data;
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="h-100 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <MessagesContainer />
      </Row>
    </Container>
  );
};

export default ChatPage;
