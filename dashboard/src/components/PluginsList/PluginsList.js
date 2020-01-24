import React from "react";
import styled from "styled-components";

// Components //
import Card from "shared/Card";
import SearchHeader from "components/Card/SearchHeader";

const Root = styled(Card)`
  min-height: 1000px;
  margin-top: -112px;
`;

const PluginsList = ({ className }) => {
  return (
    <Root {...{ className }}>
      <SearchHeader />
    </Root>
  );
};

export default PluginsList;
