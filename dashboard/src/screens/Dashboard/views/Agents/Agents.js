import React, { useCallback } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { Container } from "@comba.se/ui";
import { AgentsIcon } from "@comba.se/ui/Icons";

// Contexts //
import AgentsContext from "contexts/Agents";

// Hooks //
import useAgents from "hooks/useAgents";

// Views //
import AgentDetail from "./views/AgentDetail";
import InviteAgents from "./views/InviteAgents";

// Components ///
import ScreenRoot from "shared/ScreenRoot";
import FullScreenHeader from "components/FullScreenHeader";
import AgentsList from "components/AgentsList";

const Root = styled(ScreenRoot)`
  flex: 1;
  padding-bottom: 40px;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    overflow-y: scroll;
  }
`;

const renderAgentDetail = props => <AgentDetail {...props} />;
const renderInviteAgents = props => <InviteAgents {...props} />;

export default ({ history, match }) => {
  const [agents, tabs] = useAgents();
  const onFABClick = useCallback(() => history.push(`${match.url}/invite`), [
    history,
    match
  ]);
  return (
    <AgentsContext.Provider value={agents}>
      <Root>
        <FullScreenHeader
          icon={AgentsIcon}
          text={`${agents.length} total agents`}
          title="Agents"
        />
        <Container>
          <AgentsList {...{ agents, tabs }} {...{ onFABClick }} />
        </Container>
        <Route path={`${match.url}/:agentId`} render={renderAgentDetail} />
        <Route path={`${match.url}/invite`} children={renderInviteAgents} />
      </Root>
    </AgentsContext.Provider>
  );
};
