import { useContext, useMemo } from 'react';

// Hooks //
import usePrevious from 'hooks/usePrevious';

// Contexts //
import AgentsContext from 'contexts/Agents';

export default agentId => {
    const [agents, tabs, { refetchAgents }] = useContext(AgentsContext); // eslint-disable-line no-unused-vars
    const prevAgentId = usePrevious(agentId);
    const agent = useMemo(() => {
        if (!agentId && !prevAgentId) {
            return null;
        }
        return agents.find(({ _id }) => (agentId || prevAgentId) === _id);
    }, [agents, agentId, prevAgentId]);
    return [agent, { refetchAgents }];
};
