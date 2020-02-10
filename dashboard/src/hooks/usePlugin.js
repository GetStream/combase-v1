import { useCallback, useContext, useMemo } from 'react';
import AuthContext from 'contexts/Auth';
import PluginsContext from 'contexts/Plugins';
import request from 'utils/request';

export default slug => {
    const user = useContext(AuthContext);
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
                    'put',
                    {
                        body: JSON.stringify({
                            ...plugin,
                            enabled: checked,
                        }),
                    },
                    user.tokens.api
                );
                await refetch();
            } catch (error) {
                // TODO: Snackbar
                console.log(error);
            }
        },
        [plugin]
    );

    return [plugin, refetch, togglePlugin];
};
