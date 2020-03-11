import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import styled from 'styled-components';
import request from "utils/request";

import AuthContext from "./index";
import SnackbarContext from "@comba.se/ui/Snackbar";
import { LoadingState } from "@comba.se/ui";

const LoadingRoot = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default ({ children }) => {
  const { queueSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [organization, setOrg] = useState(
    JSON.parse(localStorage.getItem("organization")) || null
  );

  const getOrg = useCallback(async () => {
    try {
      setLoading(true);
      const data = await request(`v1/organizations/${process.env.REACT_APP_ORGANIZATION_ID}`, "get");
      localStorage.setItem("organization", JSON.stringify(data));
      setOrg(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const data = await request("v1/auth/login", "post", {
          body: JSON.stringify({
            email,
            password
          })
        });
        data.id = data._id;
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        queueSnackbar({
          isError: true,
          text: error.message
        });
        setLoading(false);
        setError(error);
      }
    },
    [queueSnackbar]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    getOrg();
  }, [getOrg]);

  const refetchUser = useCallback(async () => {
    const data = await request(`v1/agents/${user._id}`, "get");
    const userData = { tokens: user.tokens, ...data };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, [user]);

  const refetchCurrentOrg = useCallback(async () => {
    const org = await request(`v1/organizations/${organization._id}`, "get");
    localStorage.setItem("organization", JSON.stringify(org));
    setOrg(org);
  }, [organization]);

  const value = useMemo(
    () => ({
      organization,
      refetchCurrentOrg,
      refetchUser,
      user,
      loading,
      error,
      login,
      logout
    }),
    [
      organization,
      refetchCurrentOrg,
      refetchUser,
      user,
      loading,
      error,
      login,
      logout
    ]
  );

  if (loading || !organization) {
    return (
      <LoadingRoot>
        <LoadingState />
      </LoadingRoot>
    );
  }
  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>;
};
