import { useCallback, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export default (user, config) => {
    const [chatClient, setChatClient] = useState(null);

    const getClient = useCallback(async (key, user) => {
        const client = new StreamChat(key);

        await client.setUser(
            {
                id: user._id,
                name: `${user.name.first} ${user.name.last}`,
            },
            user.tokens.stream
        );

        setChatClient(client);
    }, []);

    useEffect(() => {
        if (user) {
            if (config.stream && user.tokens.stream && !chatClient) {
                getClient(config.stream.key, user);
            }
        }
    }, [config.stream, getClient, chatClient, user]);

    return chatClient;
};
