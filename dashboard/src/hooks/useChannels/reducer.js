export default (state, action) => {
    switch (action.type) {
        case 'SET':
            const channels = [...state.channels, ...action.channels];
            return {
                ...state,
                loading: false,
                channels,
                offset: channels.length,
            };
        default:
            return state;
    }
};
