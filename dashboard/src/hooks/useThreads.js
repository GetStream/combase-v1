import { useCallback, useContext, useEffect, useState } from 'react';
import ChatContext from 'contexts/Chat';

export default () => {
    const client = useContext(ChatContext);
    const [channels, setChannels] = useState([]);

    const getThreads = useCallback(async () => {
        try {
            const data = await client.queryChannels();
            setChannels(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getThreads();
    }, []);
    return channels;
};
