import React from "react";

// Data //
import routes from "./routes";

// HOCs //
import withShell from "hocs/withShell";

const Dashboard = () => {
  return <p>dashboard</p>;
};

export default withShell(Dashboard, routes);
