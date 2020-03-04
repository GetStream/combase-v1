import { useCallback, useEffect, useReducer } from "react";
import { useChatClient } from "stream-chat-hooks";

// Hooks //
import useAuth from "hooks/useAuth";

import reducer from "./reducer";

const initialState = {
  channels: [],
  error: false,
  loading: true,
  offset: 0
};

export default (filter = {}, sort = { last_updated_at: -1 }) => {
  const client = useChatClient();
  const [{ user }] = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getChannels = useCallback(async () => {
    try {
      await dispatch({
        type: "REQUEST"
      });
      const channels = await client.queryChannels(filter, sort);
      dispatch({
        type: "SET",
        channels: channels.map(data => {
          const partner = Object.values(
            data.state.members
          ).filter(({ user: { id } }) => id !== user._id)[0].user;
          data.partner = partner;
          return data;
        }),
      });
    } catch (error) {
      console.log('error', error);
      await dispatch({
        type: "ERROR",
        error
      });
    }
  }, [filter, sort, client, user._id]);

  const handleEvents = useCallback(e => {
    dispatch(e);
  }, []);

  useEffect(() => {
    getChannels();
    client.on(handleEvents);
    return () => {
      client.off(handleEvents);
    };
  }, [client, getChannels, handleEvents]);

  return [state.channels, { loading: state.loading, error: state.error }];
};
