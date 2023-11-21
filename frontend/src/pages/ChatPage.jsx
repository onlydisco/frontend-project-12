import React, { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { actions as channelsActions } from '../slices/channelsInfoSlice.js';
import { actions as messagesActions } from '../slices/messagesInfoSlice.js';
import getAuthData from '../helpers/getAuthData';
import ChannelsContainer from '../components/ChannelsContainer.jsx';
import MessagesContainer from '../components/MessagesContainer.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authData = getAuthData();
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        const { channels, messages, currentChannelId } = response.data;
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
      } catch (error) {
        console.error(error);

        if (!error.isAxiosError) {
          toast.error(t('notifications.unknownError'));
          return;
        }

        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          toast.error(t('notifications.connectionError'));
        }
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
