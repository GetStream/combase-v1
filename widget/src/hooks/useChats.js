import { useCallback, useEffect, useMemo, useState } from "react";
import { useChannels } from "stream-chat-hooks";
import useAuth from "hooks/useAuth";
import request from "utils/request";

export default () => {
  const [{ organization, user }] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const filter = useMemo(() => ({ organization: organization._id, members: { $in: [user._id] } }), [organization, user]);
  const [channels, { loading: channelsLoading }] = useChannels(user._id, filter);
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
          `v1/chats?refs.user._id=${user._id}`,
          "get",
          null,
          process.env.REACT_APP_API_KEY
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
  }, [user._id, channels, channelsLoading]);
  useEffect(() => {
    getChats();
  }, [getChats]);
  return [chats, { loading, error }];
};
