import { useContext, useCallback, useEffect, useState } from 'react';

// Utils //
import request from 'utils/request';

// Contexts //
import AuthContext from 'contexts/Auth';

export default () => {
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState(['All']);
    const [agents, setAgents] = useState(
        JSON.parse(localStorage.getItem('agents')) || []
    );
    const user = useContext(AuthContext);

    const getAgents = useCallback(async () => {
        try {
            setLoading(true);
            const agents = await request(
                `v1/agents?refs.organization._id=${user.refs.organization._id}`,
                'get',
                null,
                user.tokens.api
            );
            setAgents(agents);
            localStorage.setItem('agents', JSON.stringify(agents));
            setTabs([
                ...new Set([
                    'All',
                    ...agents
                        .reduce((acc, { role }) => {
                            return [...acc, role];
                        }, [])
                        .sort(),
                ]),
            ]);
            setLoading(false);
        } catch (error) {
            // TODO: Error Handling
            console.log(error);
        }
    }, [user.tokens.api, user.refs.organization._id]);
    useEffect(() => {
        getAgents();
    }, [getAgents]);

    return [agents, tabs, { loading }];
};
