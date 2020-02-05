export default (state, action) => {
    console.log('client event', action);
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
        case 'notification.added_to_channel':
            const newChannels = [...state.channels, action.channel];
            return {
                ...state,
                channels: newChannels,
                offset: newChannels.length,
            };
        default:
            return state;
    }
};
