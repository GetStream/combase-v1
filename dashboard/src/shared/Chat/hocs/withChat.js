import React from 'react';
import useChannel from 'hooks/useChannel/useChannel';

export default WrappedComponent => props => {
    const [state, channel, loadMoreMessages] = useChannel(props.channelId);
    const isPartnerTyping = state.typing[state.partner.id];
    return (
        <WrappedComponent
            {...props}
            {...state}
            {...{ channel, isPartnerTyping, loadMoreMessages }}
        />
    );
};
