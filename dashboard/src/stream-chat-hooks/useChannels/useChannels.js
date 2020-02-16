import { useCallback, useContext, useEffect, useReducer } from "react";
import { useChatClient } from "stream-chat-hooks";

// Hooks //
import useAuth from "hooks/useAuth";

import reducer from "./reducer";

const initialState = {
  channels: [],
  error: false,
  loading: false,
  offset: 0
};

export default () => {
  const client = useChatClient();
  const [{ user }] = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const getChannels = useCallback(async () => {
    try {
      await dispatch({
        type: "REQUEST"
      });
      const channels = await client.queryChannels();
      await dispatch({
        type: "SET",
        channels: channels.map(data => {
          const partner = Object.values(
            data.state.members
              .without(({ user: { id } }) => id === user._id)
              .asMutable()
          )[0].user;
          data.partner = partner;
          return data;
        })
      });
    } catch (error) {
      await dispatch({
        type: "ERROR",
        error
      });
    }
  }, [client, user._id]);

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
