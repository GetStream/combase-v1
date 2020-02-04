import React from 'react';

// Contexts //
import ChannelsContext from '../contexts/Channels';

// Hooks //
import useChannels from 'hooks/useChannels';

export default WrappedComponent => props => {
    const channels = useChannels();
    return (
        <ChannelsContext.Provider value={channels}>
            <WrappedComponent {...props} />
        </ChannelsContext.Provider>
    );
};
