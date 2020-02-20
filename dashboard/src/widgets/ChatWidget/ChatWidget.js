import React, { useCallback, useState } from "react";

// Components //
import { ChatIcon } from "shared/Icons";
import FAB from "shared/FAB";
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
