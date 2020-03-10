import React from 'react';
import styled from 'styled-components';
import { ThreadList } from "@comba.se/chat";
import useChats from 'hooks/useChats';

// Components //
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

const Threads = () => {
    const [chats, { error, loading }] = useChats();
    return <Root>
        <ThreadList {...{chats, error, loading }} />
    </Root>
}

export default Threads;