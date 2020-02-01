import { useCallback, useContext, useEffect, useReducer } from 'react';
import ChatContext from 'contexts/Chat';
import AuthContext from 'contexts/Auth';

import reducer from './reducer';

const initialState = {
    channels: [],
    loading: false,
    offset: 0,
};

export default () => {
    const client = useContext(ChatContext);
    const user = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    const getChannels = useCallback(async () => {
        try {
            const channels = await client.queryChannels();
            dispatch({
                type: 'SET',
                channels,
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleEvents = useCallback(e => {
        console.log('event', e);
    });

    useEffect(() => {
        getChannels();
        client.on(handleEvents);
    }, []);
    return [state.channels];
};
