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
import ChannelsContainer from '../components/ChannelsContainer.jsx';
import MessagesContainer from '../components/MessagesContainer.jsx';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), {
          headers: auth.getAuthHeader(),
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
  }, [dispatch, navigate, t, auth]);

  return (
    <Container className="h-100 py-0 overflow-hidden bg-white flex-md-row shadow rounded">
      <Row className="h-100">
        <ChannelsContainer />
        <MessagesContainer />
      </Row>
    </Container>
  );
};

export default ChatPage;
