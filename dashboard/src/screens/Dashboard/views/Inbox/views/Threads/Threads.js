import React from 'react';
import styled from 'styled-components';
import { ThreadList } from "@comba.se/chat";
import useChats from 'hooks/useChats';

// Components //
import MenuButton from 'shared/MenuButton';
import ChatItem from 'shared/Chat/ChatItem';

const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 375px;
    position: fixed;
    top: 0;
    left: 96px;
    right: 0;
    bottom: 0;
  }
`;

// Custom Thread ListItem component `ChatItem`
// Used to enhance the ThreadList with data from
// mongo like status.
const renderThread = ({ channel: { id }, refs: { user: partner }, ...rest }) => <ChatItem {...{ id, partner }} />;

const Threads = () => {
  const [chats, channels, { error, loading }] = useChats();
  return <Root>
    <ThreadList channels={chats} {...{ error, loading }} leftButtonElement={MenuButton} renderThread={renderThread} />
  </Root>
}

export default Threads;