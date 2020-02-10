import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/Auth';

// Utils //
import request from 'utils/request';

export default () => {
    const [loading, setLoading] = useState(false);
    const [plugins, setPlugins] = useState(null);
    const user = useContext(AuthContext);

    const fetchPlugins = useCallback(async () => {
        try {
            setLoading(true);
            const data = await request(
                `v1/plugins?refs.organization._id=${user.refs.organization._id}`,
                'get',
                null,
                user.tokens.api
            );
            let pluginData = {};
            data.forEach(plugin => {
                pluginData[plugin.name] = plugin;
            });
            setPlugins(pluginData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // TODO: Snackbar
            console.log(error);
        }
    }, [user]);
    useEffect(() => {
        fetchPlugins();
    }, [fetchPlugins]);
    return [plugins, { refetch: fetchPlugins, loading }];
};
