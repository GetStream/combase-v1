import { useContext } from "react";
import ChatContext from "./ChatContext";

export default () => {
  return useContext(ChatContext);
};
