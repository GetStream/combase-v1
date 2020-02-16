import React from "react";
import ChatContext from "./ChatContext";
import useInitClient from "./useInitClient";

export default ({ children, config, user }) => {
  const client = useInitClient(user, config);
  if (!client) {
    return null;
  }
  return <ChatContext.Provider value={client}>{children}</ChatContext.Provider>;
};
