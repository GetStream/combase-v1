import { useContext, useMemo } from 'react';
import PluginsContext from 'contexts/Plugins';

export default slug => {
    const [activePlugins, { refetch }] = useContext(PluginsContext);
    const plugin = useMemo(() => {
        if (!slug || !activePlugins) {
            return null;
        }
        return activePlugins[slug];
    }, [slug, activePlugins]);
    return [plugin, refetch];
};
