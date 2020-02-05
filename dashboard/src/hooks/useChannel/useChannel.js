import { useCallback, useEffect, useReducer } from 'react';
import useCurrentChannel from 'hooks/useCurrentChannel';
import reducer from './reducer';

const initialState = {
    error: false,
    loading: true,
    messages: [],
    online: true,
    read: {},
    typing: {},
    watchers: {},
    partner: {},
};

export default channelId => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const channel = useCurrentChannel(channelId);

    const handleEvents = useCallback(event => {
        return dispatch(event);
    }, []);

    const initializeChannel = useCallback(async () => {
        if (!channel.initialized) {
            try {
                await channel.watch();
            } catch (error) {
                dispatch({
                    type: 'ERROR',
                    error,
                });
            }
        }
        if (!state.error) {
            channel.on(handleEvents);
            dispatch({
                type: 'INIT_STATE',
                messages: channel.state.messages,
                read: channel.state.read,
                watchers: channel.state.watchers,
                members: channel.state.members,
                watcher_count: channel.state.watcher_count,
                partner: channel.partner,
            });
        }
    }, [channel, state.error, handleEvents]);

    const destroyChannel = useCallback(() => {
        if (channel) {
            channel.off(handleEvents);
            dispatch({
                type: 'INIT_STATE',
                ...initialState,
            });
        }
    }, [channel, handleEvents]);

    useEffect(() => {
        if (channel) {
            initializeChannel();
        }
        return () => destroyChannel();
    }, [channelId, channel, destroyChannel, initializeChannel]);

    return [state, channel];
};
