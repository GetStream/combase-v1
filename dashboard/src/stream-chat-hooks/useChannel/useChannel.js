import { useCallback, useEffect, useReducer } from "react";
import { useCurrentChannel } from "stream-chat-hooks";
import reducer from "./reducer";

const initialState = {
  error: false,
  limit: 25,
  loading: true,
  loadingMore: false,
  messages: [],
  noMoreMessages: false,
  online: true,
  read: {},
  typing: {},
  watchers: {},
  partner: {}
};

export default channelId => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const channel = useCurrentChannel(channelId);

  const handleEvents = useCallback(event => {
    return dispatch(event);
  }, []);

  const loadMoreMessages = useCallback(async () => {
    console.log("loading more?", state.noMoreMessages, state.loadingMore);
    if (state.noMoreMessages || state.loadingMore) {
      return;
    }
    dispatch({
      type: "loadMore.request"
    });
    try {
      const { messages } = await channel.query({
        messages: {
          limit: state.limit,
          id_lt: state.messages[state.messages.length - 1].id
        }
      });
      dispatch({
        type: "loadMore.success",
        messages
      });
    } catch (error) {
      dispatch({
        type: "loadMore.error",
        error
      });
    }
  }, [
    channel,
    state.limit,
    state.loadingMore,
    state.messages,
    state.noMoreMessages
  ]);

  const initializeChannel = useCallback(async () => {
    if (!channel.initialized) {
      try {
        await channel.watch({ presence: true });
      } catch (error) {
        dispatch({
          type: "ERROR",
          error
        });
      }
    }
    if (!state.error) {
      channel.on(handleEvents);
      dispatch({
        type: "INIT_STATE",
        messages: channel.state.messages,
        read: channel.state.read[channel.partner.id],
        watchers: channel.state.watchers,
        members: channel.state.members,
        watcher_count: channel.state.watcher_count,
        partner: channel.partner
      });
    }
  }, [channel, state.error, handleEvents]);

  const destroyChannel = useCallback(() => {
    if (channel) {
      channel.off(handleEvents);
      dispatch({
        type: "INIT_STATE",
        ...initialState
      });
    }
  }, [channel, handleEvents]);

  useEffect(() => {
    if (channel) {
      initializeChannel();
    }
    return () => destroyChannel();
  }, [channelId, channel, destroyChannel, initializeChannel]);

  return [state, channel, loadMoreMessages];
};
