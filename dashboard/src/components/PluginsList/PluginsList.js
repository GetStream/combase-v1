import React from "react";
import styled from "styled-components";

// Components //
import Card from "shared/Card";
import SearchHeader from "components/Card/SearchHeader";
import Tabs, { Tab } from "components/Tabs";

const Root = styled(Card)`
  min-height: 1000px;
  margin-top: -112px;
`;

const Content = styled.div`
  padding: 0px 40px;
`;

const PluginsList = ({ className }) => {
  return (
    <Root {...{ className }}>
      <SearchHeader />
      <Content>
        <Tabs>
          <Tab active label="All" />
          <Tab label="Enrichment" />
          <Tab label="CRM" />
          <Tab label="Custom" />
        </Tabs>
      </Content>
    </Root>
  );
};

export default PluginsList;
