import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { selectCurrentChannel } from '../slices/channelsInfoSlice.js';
import { selectCurrentChannelMessages } from '../slices/messagesInfoSlice.js';
import MessagesForm from './MessagesForm.jsx';

const MessagesContainer = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(selectCurrentChannel);
  const currentChannelMessages = useSelector(selectCurrentChannelMessages);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      delay: 0,
      duration: 0,
    });
  }, [currentChannelMessages.length]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              <span className="me-1">#</span>
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.counter.count', {
              count: currentChannelMessages?.length,
            })}
          </span>
        </div>

        <div
          className="chat-messages overflow-auto h-100 py-1 px-4"
          id="messages-box"
        >
          {currentChannelMessages?.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>
                {message.username}
                :
                {'  '}
              </b>
              {message.body}
            </div>
          ))}
        </div>

        <div className="mt-auto px-4 py-3">
          <MessagesForm currentChannelId={currentChannel?.id} />
        </div>
      </div>
    </Col>
  );
};
export default MessagesContainer;
