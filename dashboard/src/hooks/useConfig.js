import { useCallback, useEffect, useState } from 'react';
import request from 'utils/request';

export default () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getConfig = useCallback(async () => {
        try {
            setLoading(true);
            const data = await request('v1/configs');
            console.log(data);
            setConfig(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }, []);

    useEffect(() => {
        const config = getConfig();
        setConfig(config);
    }, []);

    return [config, { loading, error }];
};
