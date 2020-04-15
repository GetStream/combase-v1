import { useContext } from "react";
import AuthContext from "contexts/Auth";

export default () => {
  return useContext(AuthContext);
};
