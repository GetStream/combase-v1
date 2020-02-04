import { useCallback, useContext, useEffect, useReducer } from 'react';
import ChatContext from 'contexts/Chat';
import AuthContext from 'contexts/Auth';

import reducer from './reducer';

const initialState = {
    channels: [],
    error: false,
    loading: false,
    offset: 0,
};

export default () => {
    const client = useContext(ChatContext);
    const user = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getChannels();
        client.on(handleEvents);
        return () => {
            client.off(handleEvents);
        };
    }, []);

    const getChannels = useCallback(async () => {
        try {
            await dispatch({
                type: 'REQUEST',
            });
            const channels = await client.queryChannels();
            await dispatch({
                type: 'SET',
                channels: channels.map(data => {
                    const partner = Object.values(
                        data.state.members
                            .without(({ user: { id } }) => id === user._id)
                            .asMutable()
                    )[0].user;
                    data.partner = partner;
                    return data;
                }),
            });
        } catch (error) {
            await dispatch({
                type: 'ERROR',
                error,
            });
        }
    }, []);

    const handleEvents = useCallback(e => {
        switch (e.type) {
            default:
                console.log(e);
        }
    }, []);

    return [state.channels, { loading: state.loading, error: state.error }];
};
