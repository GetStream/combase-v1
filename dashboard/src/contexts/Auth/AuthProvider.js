import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import request from 'utils/request';

import AuthContext from './index';

export default ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login = useCallback(async (email, password) => {
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
            localStorage.setItem('user', JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const value = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            logout,
        }),
        [user, loading, error, login, logout]
    );
    return (
        <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
    );
};
