import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import request from "utils/request";

import AuthContext from "./index";
import SnackbarContext from "contexts/Snackbar";

export default ({ children }) => {
  const { queueSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [organizations, setOrgs] = useState([]);

  const [organization, setOrg] = useState(
    JSON.parse(localStorage.getItem("organization")) || null
  );

  const getOrgs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await request("v1/organizations", "get");
      setOrgs(data);
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

  const setCurrentOrganization = useCallback(
    id => {
      const org = organizations.filter(({ _id }) => _id === id)[0];
      localStorage.setItem("organization", JSON.stringify(org));
      setOrg(org);
    },
    [organizations, setOrg]
  );

  useEffect(() => {
    getOrgs();
  }, [getOrgs]);

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
      organizations,
      setCurrentOrganization,
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
      organizations,
      setCurrentOrganization,
      refetchCurrentOrg,
      refetchUser,
      user,
      loading,
      error,
      login,
      logout
    ]
  );
  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>;
};
