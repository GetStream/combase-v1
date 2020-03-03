import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FAB } from "@comba.se/ui";
import { AgentsIcon } from "@comba.se/ui/dist/Icons";

// Hooks //
import usePageSheet from "hooks/usePageSheet";

// Components //
import AgentItem from "components/AgentItem";
import EmptyState from "shared/EmptyState";
import PageSheet from "components/PageSheet";

const Root = styled(PageSheet)`
  margin-top: -112px;
`;

const Content = styled.div`
  flex: 1;
`;

const EmptyWrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
`;

const renderEmpty = () => (
  <EmptyWrapper>
    <EmptyState icon={AgentsIcon} text="No agents match your search." />
  </EmptyWrapper>
);

const renderAgents = results =>
  results.map(({ name, ...agent }, key) => (
    <AgentItem {...agent} name={`${name.first} ${name.last}`} {...{ key }} />
  ));

const searchKeys = ["name.first", "name.last"];

const AgentsList = ({ agents, className, tabs, onFABClick }) => {
  const [results, setQuery, activeTab, setActiveTab] = usePageSheet(
    agents,
    searchKeys,
    "role"
  );

  return (
    <Root
      {...{ activeTab, className, setActiveTab, tabs }}
      onQueryChange={setQuery}
    >
      <Content>
        {results.length ? renderAgents(results) : renderEmpty()}
      </Content>
      {!!onFABClick ? <FAB onClick={onFABClick} /> : null}
    </Root>
  );
};

AgentsList.propTypes = {
  agents: PropTypes.array,
  className: PropTypes.string,
  onFABClick: PropTypes.func,
  tabs: PropTypes.array
};

export default AgentsList;
