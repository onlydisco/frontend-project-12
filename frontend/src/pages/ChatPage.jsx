import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import getAuthToken from '../helpers/getAuthToken';
import ChannelsContainer from '../components/ChannelsContainer.jsx';
import MessagesContainer from '../components/MessagesContainer.jsx';

const ChatPage = () => {
  const [currentChannel, setCurrentChannel] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        console.log('fetchData -> response:', response.data);
        const { channels, messages, currentChannelId } = response.data;
        const currChannel = channels.find(
          (channel) => currentChannelId === channel.id,
        );
        setCurrentChannel(currChannel);
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
        <ChannelsContainer
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
        <MessagesContainer currentChannel={currentChannel} />
      </Row>
    </Container>
  );
};

export default ChatPage;
