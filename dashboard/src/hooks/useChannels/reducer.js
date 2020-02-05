import { moveChannelToTop, updateUserPresence } from './utils';

export default (state, action) => {
    console.log('client event', action.type, action);
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case 'REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
            };
        case 'SET':
            const channels = [...state.channels, ...action.channels];
            return {
                ...state,
                loading: false,
                channels,
                offset: channels.length,
                error: false,
            };
        case 'message.new':
            return {
                ...state,
                channels: moveChannelToTop(state.channels, action.cid),
            };
        case 'notification.added_to_channel':
            const newChannels = [...state.channels, action.channel];
            return {
                ...state,
                channels: newChannels,
                offset: newChannels.length,
            };
        case 'user.watching.start':
            return {
                ...state,
                channels: updateUserPresence(
                    state.channels,
                    action.cid,
                    action.user.id,
                    true
                ),
            };
        case 'user.watching.stop':
            return {
                ...state,
                channels: updateUserPresence(
                    state.channels,
                    action.cid,
                    action.user.id,
                    false
                ),
            };
        default:
            return state;
    }
};
