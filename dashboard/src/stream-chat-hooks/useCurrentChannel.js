import { useContext, useMemo } from "react";
import { ChannelsContext } from "stream-chat-hooks";

export default channelId => {
  const [channels] = useContext(ChannelsContext);
  const channel = useMemo(() => {
    return channels.find(({ id }) => id === channelId);
  }, [channels, channelId]);
  return channel;
};
