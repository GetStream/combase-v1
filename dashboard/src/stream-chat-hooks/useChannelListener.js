import { useCallback, useEffect, useState } from "react";
import usePrevious from "hooks/usePrevious";
import { useCurrentChannel } from "stream-chat-hooks";

export default (channelId, active) => {
  const channel = useCurrentChannel(channelId);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(
    channel.state.messages[channel.state.messages.length - 1]
  );

  const getUnreadCount = useCallback(async () => {
    const unread = await channel.countUnread();
    setUnreadCount(active ? 0 : unread);
  }, [active, channel]);

  const handleEvent = useCallback(
    data => {
      getUnreadCount();
      setLatestMessage(data.message);
    },
    [getUnreadCount]
  );

  useEffect(() => {
    getUnreadCount();
  }, [getUnreadCount]);

  const wasActive = usePrevious(active);

  useEffect(() => {
    if (active && !wasActive) {
      setUnreadCount(0);
    }
  }, [active, wasActive]);

  useEffect(() => {
    channel.on("message.new", handleEvent);
    return () => channel.off("message.new", handleEvent);
  }, [channelId, channel, handleEvent]);

  return [unreadCount, latestMessage];
};
