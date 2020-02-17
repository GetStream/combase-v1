import React from "react";

// Hooks //
import { useChannels, ChannelsContext } from "stream-chat-hooks";

export default WrappedComponent => props => {
  const channels = useChannels();
  return (
    <ChannelsContext.Provider value={channels}>
      <WrappedComponent {...props} />
    </ChannelsContext.Provider>
  );
};
