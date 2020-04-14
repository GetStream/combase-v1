import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { EmptyState, IconButton, LoadingState } from '@comba.se/ui';
import { ChatIcon, CloseIcon, CloseChatIcon, InfoIcon, TransferIcon } from "@comba.se/ui/Icons";
import Chat, { ChatHeader, InputToolbar, MessagesList } from "@comba.se/chat";

// CSS //
import pageCard from "styles/css/pageCard";

// Hooks //
import useAuth from "hooks/useAuth";

// HOCs //
import withChat from "@comba.se/chat/hocs/withChat";

// Views //
import SideDrawer from "../SideDrawer";

// Components //
import ListView from 'shared/ListView';

const Root = styled.div`
  flex: 1;
  height: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.surface};
  flex-direction: row;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    ${pageCard}
    margin-left: 375px;
    padding-right: ${({ drawerOpen }) => (drawerOpen ? 376 : 0)}px;
  }
`;

const EmptyRoot = styled(Root)`
  justify-content: center;
  align-items: center;
`;

// const dummyMessages = [
//     { system: true, text: 'Start of your conversation with Luke S.' },
// ];

const MessageThread = ({
  history,
  loading,
  match,
}) => {
  const [{ user }] = useAuth();

  const renderThread = useCallback(({ match: { isExact } }) => {
    console.log('render message thread');
    const drawerOpen = !isExact;

    const headerActions = [
      <IconButton color="alt_text" icon={CloseChatIcon} />,
      <IconButton
        color="alt_text"
        icon={TransferIcon}
        onClick={() => history.push(`${match.url}/transfer`)}
      />,
      <Route path={`/inbox/:channel/info`} children={props => {
        return (
          <IconButton
            color={match.isExact ? "alt_text" : 'red'}
            icon={match.isExact ? InfoIcon : CloseIcon}
            onClick={() => match.isExact ? history.push(`${match.url}/info`) : history.goBack()}
          />
        )
      }} />
    ];

    return (
      <>
        <Root {...{ drawerOpen }}>
          {/* <ChatWrapper>/ */}
          <Chat
            key={match.params.channel}
            channelId={match.params.channel}
            user={user}
          >
            <ChatHeader headerActions={headerActions} onBackClick={history.goBack} />
            <MessagesList />
            <InputToolbar />
          </Chat>
          {/* </ChatWrapper> */}
        </Root>
        {/* <SideDrawer {...{ match, partner }} open={drawerOpen} /> */}
      </>
    );
  }, [history, match]);

  if (!match) {
    return (
      <EmptyRoot>
        <EmptyState icon={ChatIcon} text="Select a thread." />
      </EmptyRoot>
    );
  }

  return loading ? (
    <LoadingState key="loading" />
  ) : (
      <Route
        path={`${match.url}`}
        children={renderThread}
      />
    );
};

export default MessageThread;
