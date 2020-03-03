import { useCallback, useEffect, useState } from "react";
import { useChannels } from "stream-chat-hooks";
import useAuth from "hooks/useAuth";
import request from "utils/request";

export default () => {
  // TODO:
  // In here we need a list of all  the current users chats
  // so we can map them to the channels using stream-chat-hooks
  // and "enrich" them with combase data

  // NOTE: Above is done now, we just need to replace useChannels
  // around the app with useChats and make sure we're leveraging
  // the chat data like score, etc. also gives us a way to persist chats,
  // and progressively load the channels in at runtime.

  const [{ user }] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [channels, { loading: channelsLoading }] = useChannels();
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
  return [chats, { loading, error }];
};
