import { useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import ChannelsContext from 'shared/Chat/contexts/Channels';
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
    const [channels] = useContext(ChannelsContext);
    const channel = useMemo(() => {
        return channels.find(({ id }) => id === channelId);
    }, [channels, channelId]);

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
    }, [channel]);

    const destroyChannel = useCallback(() => {
        if (channel) {
            channel.off(handleEvents);
            dispatch({
                type: 'INIT_STATE',
                ...initialState,
            });
        }
    }, [channel]);

    useEffect(() => {
        if (channel) {
            initializeChannel();
        }
        return () => destroyChannel();
    }, [channelId, channel]);
    return [state, channel];
};
