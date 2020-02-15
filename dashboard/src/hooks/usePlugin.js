import { useCallback, useContext, useMemo } from "react";
import useAuth from "hooks/useAuth";
import PluginsContext from "contexts/Plugins";
import { useSnackbar } from "contexts/Snackbar";
import request from "utils/request";

export default slug => {
  const [{ user }] = useAuth();
  const { queueSnackbar } = useSnackbar();
  const [activePlugins, { refetch }] = useContext(PluginsContext);
  const plugin = useMemo(() => {
    if (!slug || !activePlugins) {
      return null;
    }
    return activePlugins[slug];
  }, [slug, activePlugins]);

  const togglePlugin = useCallback(
    async ({ target: { checked } }) => {
      try {
        await request(
          `v1/plugins/${plugin._id}`,
          "put",
          {
            body: JSON.stringify({
              ...plugin,
              enabled: checked
            })
          },
          user.tokens.api
        );
        await refetch();
      } catch (error) {
        queueSnackbar({
          replace: true,
          isError: true,
          text: error.message
        });
        console.log(error);
      }
    },
    [plugin, user.tokens.api, refetch, queueSnackbar]
  );

  return [plugin, refetch, togglePlugin];
};
