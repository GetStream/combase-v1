import { useCallback, useEffect, useState } from 'react';
import request from 'utils/request';

export default () => {
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getConfig = useCallback(async () => {
        try {
            setLoading(true);
            const data = await request('v1/configs');
            setConfig(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }, []);

    useEffect(() => {
        getConfig();
    }, [getConfig]);

    return [config, { loading, error }];
};
