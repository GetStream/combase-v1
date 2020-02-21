import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useChatClient } from 'stream-chat-hooks';
import UIfx from 'uifx';

// Contexts //
import ShellContext from 'contexts/Shell';

// Sounds //
import newMessageSound from 'sounds/new_message.wav';
import newConversationSound from 'sounds/new_conversation.wav';

const messageChime = new UIfx(newMessageSound);
const conversationChime = new UIfx(newConversationSound);

export default () => {
    const client = useChatClient();
    const { sounds } = useContext(ShellContext);

    const handleNewMessage = useCallback(() => {
        messageChime.play();
    }, []);

    const handleNewConversation = useCallback(() => {
        conversationChime.play();
    }, []);

    useEffect(() => {
        if (sounds.enabled) {
            client.on('notification.message_new', handleNewMessage);
            client.on('notification.added_to_channel', handleNewConversation);
        }
        return () => sounds.enabled ? client.off('message.new', handleNewMessage) : null;
    }, [client, handleNewConversation, handleNewMessage, sounds.enabled]);
}