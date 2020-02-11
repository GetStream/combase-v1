import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// CSS //
import pageCard from 'styles/css/pageCard';

// Contexts //
import AuthContext from 'contexts/Auth';

// HOCs //
import withChat from 'shared/Chat/hocs/withChat';

// Views //
import SideDrawer from '../SideDrawer';

// Components //
import LoadingState from 'shared/LoadingState';
import Chat from 'shared/Chat';
import { ChatIcon } from 'shared/Icons';
import EmptyState from 'shared/EmptyState';

const Root = styled.div`
    flex: 1;
    z-index: 2;
    background-color: ${({ theme }) => theme.color.surface};
    flex-direction: row;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        ${pageCard}
    }
`;

const EmptyRoot = styled(Root)`
    justify-content: center;
    align-items: center;
`;

const ChatWrapper = styled.div`
    margin-right: ${({ drawerOpen }) => (drawerOpen ? 376 : 0)}px;
    flex: 1;
`;

// const dummyMessages = [
//     { system: true, text: 'Start of your conversation with Luke S.' },
// ];

const MessageThread = ({
    channel,
    isPartnerTyping,
    match,
    loading,
    loadMoreMessages,
    messages,
    partner,
    read,
}) => {
    const user = useContext(AuthContext);

    const markRead = useCallback(async () => {
        if (channel) {
            await channel.markRead();
        }
    }, [channel]);

    useEffect(() => {
        if (match && match.params.channel) {
            markRead();
        }
    }, [channel, match, markRead]);

    const onSend = useCallback(
        messages => {
            channel.sendMessage(messages[0]);
        },
        [channel]
    );

    if (!match) {
        return (
            <EmptyRoot>
                <EmptyState icon={ChatIcon} text="Select a thread." />
            </EmptyRoot>
        );
    }

    return (
        <Root>
            {loading ? (
                <LoadingState key="loading" />
            ) : (
                <Route
                    path={`${match.url}`}
                    children={({ match: { isExact } }) => {
                        const drawerOpen = !isExact;
                        return (
                            <>
                                <ChatWrapper {...{ drawerOpen }}>
                                    <Chat
                                        showTypingIndicator={isPartnerTyping}
                                        onLoadMore={loadMoreMessages}
                                        {...{
                                            onSend,
                                            messages,
                                            partner,
                                            read,
                                            user,
                                        }}
                                    />
                                </ChatWrapper>
                                <SideDrawer open={drawerOpen} />
                            </>
                        );
                    }}
                />
            )}
        </Root>
    );
};

export default withChat(MessageThread);
