import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "contexts/Auth";

// Hooks //
import useAuth from "hooks/useAuth";
import { useSnackbar } from "contexts/Snackbar";

// Utils //
import request from "utils/request";

export default () => {
  const { queueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [plugins, setPlugins] = useState(
    JSON.parse(localStorage.getItem("plugins")) || null
  );
  const [{ user }] = useAuth();

  const fetchPlugins = useCallback(async () => {
    try {
      setLoading(true);
      const data = await request(
        `v1/plugins?refs.organization._id=${user.refs.organization._id}`,
        "get",
        null,
        user.tokens.api
      );
      let pluginData = {};
      data.forEach(plugin => {
        pluginData[plugin.name] = plugin;
      });
      setPlugins(pluginData);
      localStorage.setItem("plugins", JSON.stringify(pluginData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      queueSnackbar({
        replace: true,
        isError: true,
        text: error.message
      });
    }
  }, [user, queueSnackbar]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPlugins();
  }, [fetchPlugins]);
  return [plugins, { refetch: fetchPlugins, loading }];
};
