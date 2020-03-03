import React, { useCallback, useState } from "react";
import { FAB } from "@comba.se/ui";
import { ChatIcon } from "@comba.se/ui/dist/Icons";

// Components //
import Widget from "./Widget";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const toggleChatWidget = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <Widget {...{ open }} />
      <FAB icon={ChatIcon} onClick={toggleChatWidget} />
    </>
  );
};

export default ChatWidget;
