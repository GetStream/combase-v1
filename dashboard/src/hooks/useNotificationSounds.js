import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useChatClient } from 'stream-chat-hooks';
import ShellContext from 'contexts/Shell';
import UIfx from 'uifx';
import newMessageSound from 'sounds/new_message.wav';

const chime = new UIfx(newMessageSound);

export default () => {
    const client = useChatClient();
    const { sounds } = useContext(ShellContext);
    const handleNewMessage = useCallback(() => {
        chime.play();
    }, []);

    useEffect(() => {
        if (sounds.enabled) {
            client.on('notification.message_new', handleNewMessage);
        }
        return () => sounds.enabled ? client.off('message.new', handleNewMessage) : null;
    }, [client, handleNewMessage, sounds.enabled])
}