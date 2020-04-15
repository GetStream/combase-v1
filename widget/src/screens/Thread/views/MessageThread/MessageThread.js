import React, { useCallback, useEffect } from 'react';
import { LoadingState } from '@comba.se/ui';
import Chat from '@comba.se/chat';

// Hooks //
import { useAuth } from 'contexts/Auth';

// HOCs //
import withChat from '@comba.se/chat/hocs/withChat';

const MessageThread = (props) => {
    const {
        channel,
        history,
        isPartnerTyping,
        match,
        loading,
        loadMoreMessages,
        messages,
        partner,
        read
    } = props;
    const [{ user }] = useAuth();
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

    if (loading) {
        return <LoadingState />
    }

    return (
        <Chat
            showTypingIndicator={isPartnerTyping}
            onLoadMore={loadMoreMessages}
            channelId={channel.id}
            {...{
                onSend,
                messages,
                partner,
                read,
                user
            }}
        />
    );
};

export default withChat(MessageThread);