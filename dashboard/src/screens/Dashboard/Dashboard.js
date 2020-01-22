import React from "react";
import styled from "styled-components";

// Data //
import routes from "./routes";

// HOCs //
import withShell from "hocs/withShell";

// Components //
const Root = styled.div`
  flex: 1;
`;

const Dashboard = () => {
  return <Root>dashboard</Root>;
};

export default withShell(Dashboard, routes);
