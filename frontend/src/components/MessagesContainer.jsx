import React from 'react';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';

import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import MessagesForm from './MessagesForm.jsx';

const MessagesContainer = ({ currentChannel }) => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter(
    (message) => currentChannel.id === message.channelId,
  );

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel.name}`}</b>
          </p>
          <span className="text-muted">
            {currentChannelMessages.length}
            {' '}
            сообщений
          </span>
        </div>

        <div className="chat-messages overflow-auto px-3" id="messages-box">
          <div className="text-break mb-2">
            <b>admin: </b>
            Hi, user. How are you?
          </div>
          <div className="text-break mb-2">
            <b>user: </b>
            Hello, admin! I am fine.
          </div>
          <div className="text-break mb-2">
            <b>user: </b>
            Hello, admin! I am fine. Hello, admin! I am fine. Hello, admin! I am
            fine.
          </div>
        </div>

        <div className="mt-auto px-3 py-3">
          <MessagesForm />
        </div>
      </div>
    </Col>
  );
};
export default MessagesContainer;
