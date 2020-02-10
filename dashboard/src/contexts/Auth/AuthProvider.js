import React, { useCallback, useEffect, useMemo, useState } from 'react';
import request from 'utils/request';

import AuthContext from './index';

export default ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const [organizations, setOrgs] = useState([]);

    const [organization, setOrg] = useState(
        JSON.parse(localStorage.getItem('organization')) || null
    );

    const getOrgs = useCallback(async () => {
        try {
            setLoading(true);
            const data = await request('v1/organizations', 'get');
            setOrgs(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }, []);

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

    const setCurrentOrganization = useCallback(
        id => {
            const org = organizations.filter(({ _id }) => _id === id)[0];
            localStorage.setItem('organization', JSON.stringify(org));
            setOrg(org);
        },
        [organizations, setOrg]
    );

    useEffect(() => {
        getOrgs();
    }, [getOrgs]);

    const value = useMemo(
        () => ({
            organization,
            organizations,
            setCurrentOrganization,
            user,
            loading,
            error,
            login,
            logout,
        }),
        [
            organization,
            organizations,
            setCurrentOrganization,
            user,
            loading,
            error,
            login,
            logout,
        ]
    );
    return (
        <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
    );
};
