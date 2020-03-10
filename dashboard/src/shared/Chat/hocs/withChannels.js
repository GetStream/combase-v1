import React, { useMemo } from "react";

// Hooks //
import useAuth from 'hooks/useAuth';
import { useChannels, ChannelsContext } from "stream-chat-hooks";

export default WrappedComponent => props => {
  const [{ organization, user }] = useAuth();
  const filter = useMemo(() => ({ organization: organization._id, members: { $in: [user._id] } }), [organization, user]);
  const channels = useChannels(user._id, filter);
  return (
    <ChannelsContext.Provider value={channels}>
      <WrappedComponent {...props} />
    </ChannelsContext.Provider>
  );
};
