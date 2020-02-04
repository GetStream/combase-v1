import React from 'react';
import useChannel from 'hooks/useChannel/useChannel';

export default WrappedComponent => props => {
    const [state, channel] = useChannel(props.channelId);
    if (state.loading && props.channelId) {
        return null;
    }
    return <WrappedComponent {...props} {...state} {...{ channel }} />;
};
