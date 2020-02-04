import { useCallback, useEffect, useState } from 'react';
import request from 'utils/request';

export default (email, password) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = useCallback(async () => {
        try {
            setLoading(true);
            const data = await request('v1/auth/login', 'post', {
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            data.id = data._id;
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }, [email, password]);

    useEffect(() => {
        login();
    }, [login]);
    return [user, { loading, error }];
};
