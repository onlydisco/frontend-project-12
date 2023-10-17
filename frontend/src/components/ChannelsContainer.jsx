import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const ChannelsContainer = ({ currentChannel, setCurrentChannel }) => {
  const channels = useSelector(channelsSelectors.selectAll);

  const handleClickChannel = (channel) => {
    setCurrentChannel(channel);
  };

  return (
    <Col
      xs={4}
      md={3}
      className="border-end px-0 bg-light flex-column h-100 d-flex"
    >
      <div className="d-flex justify-content-between px-3 py-4 mt-1 mb-2">
        <b>Каналы</b>
        <Button className="p-0 text-primary" variant="group-vertical">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Button
              className="w-100 rounded-0 text-start"
              variant={currentChannel.id === channel.id && 'secondary'}
              onClick={() => handleClickChannel(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default ChannelsContainer;
