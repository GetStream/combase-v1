import { useCallback, useEffect, useMemo, useState } from "react";
import { useChannels } from "stream-chat-hooks";
import useAuth from "hooks/useAuth";
import request from "utils/request";

export default () => {
  const [{ user }] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [{ channels, loading: channelsLoading }] = useChannels();
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );

  const getChats = useCallback(async () => {
    if (channelsLoading) {
      return;
    }

    if (channels.length) {
      try {
        setLoading(true);
        const data = await request(
          `v1/chats?refs.agents.assignee.agent._id=${user._id}`,
          "get",
          null,
          user.tokens.api
        );

        const chatData = data.map(chat => ({
          ...chat,
          channel: channels.find(({ id }) => id === chat._id)
        }));

        setChats(chatData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user._id, user.tokens.api, channels, channelsLoading]);
  useEffect(() => {
    getChats();
  }, [getChats]);
  return [chats, channels, { loading, error }];
};
