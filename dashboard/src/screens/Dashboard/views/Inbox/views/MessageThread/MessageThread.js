import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';

// CSS //
import pageCard from 'styles/css/pageCard';

// Contexts //
import AuthContext from 'contexts/Auth';

// HOCs //
import withChat from 'shared/Chat/hocs/withChat';

// Components //
import LoadingState from 'shared/LoadingState';
import Chat from 'shared/Chat';
import { ChatIcon } from 'shared/Icons';
import EmptyState from 'shared/EmptyState';

const Root = styled.div`
    flex: 1;
    z-index: 2;
    background-color: ${({ theme }) => theme.color.surface};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        ${pageCard}
    }
`;

const EmptyRoot = styled(Root)`
    justify-content: center;
    align-items: center;
`;

const dummyMessages = [
    { system: true, text: 'Start of your conversation with Luke S.' },
];

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
                <Chat
                    showTypingIndicator={isPartnerTyping}
                    onLoadMore={loadMoreMessages}
                    {...{ onSend, messages, partner, read, user }}
                />
            )}
        </Root>
    );
};

export default withChat(MessageThread);
