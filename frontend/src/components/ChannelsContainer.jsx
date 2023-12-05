import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import {
  actions as channelsActions,
  channelsSelectors,
  selectCurrentChannelId,
} from '../slices/channelsInfoSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';
import Modal from './modals/Modal.jsx';

const ChannelsContainer = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { t } = useTranslation();

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'channels-box',
      delay: 0,
      duration: 0,
    });
  }, [channels]);

  const handleActiveChannel = (channelId) => {
    dispatch(channelsActions.setCurrentChannelId(channelId));
  };

  const handleAddModal = () => {
    dispatch(modalActions.showModal({ type: 'addChannel' }));
  };

  const handleRenameModal = (channelId) => {
    dispatch(
      modalActions.showModal({ type: 'renameChannel', extra: { channelId } }),
    );
  };

  const handleRemoveModal = (channelId) => {
    dispatch(
      modalActions.showModal({ type: 'removeChannel', extra: { channelId } }),
    );
  };

  return (
    <Col
      xs={4}
      md={3}
      className="border-end px-0 bg-light flex-column h-100 d-flex"
    >
      <div className="d-flex justify-content-between align-items-center  px-3 py-4 mt-1 mb-2">
        <b>{t('channels.header')}</b>
        <Button
          type="button"
          className="p-1 text-primary focus-ring border-0"
          variant="group-vertical"
          onClick={handleAddModal}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {channels?.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            {channel.removable ? (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  type="button"
                  className="w-100 rounded-0 text-start text-truncate focus-ring border-0"
                  variant={currentChannelId === channel.id && 'primary'}
                  onClick={() => handleActiveChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle
                  className="flex-grow-0 rounded-0 border-0 focus-ring"
                  variant={currentChannelId === channel.id && 'primary'}
                  id="dropdown-split-basic"
                  split
                >
                  <span className="visually-hidden">
                    {t('channels.dropdownHidden')}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleRemoveModal(channel.id)}
                    href="#"
                  >
                    {t('channels.channelButtons.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRenameModal(channel.id)}
                    href="#"
                  >
                    {t('channels.channelButtons.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                type="button"
                className="w-100 rounded-0 text-start text-truncate focus-ring border-0"
                variant={currentChannelId === channel.id && 'primary'}
                onClick={() => handleActiveChannel(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            )}
          </li>
        ))}
      </ul>
      <Modal />
    </Col>
  );
};

export default ChannelsContainer;
