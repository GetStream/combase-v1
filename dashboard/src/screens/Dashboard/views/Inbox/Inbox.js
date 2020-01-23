import React from "react";
import { Route } from "react-router-dom";

// Views //
import ThreadList from "./views/ThreadList";
import MessageThread from "./views/MessageThread";

// Components ///
import ListDetailView from "components/ListDetailView";
import ScreenRoot from "shared/ScreenRoot";

const renderThreadList = props => <ThreadList {...props} />;
const renderMessageThread = props => <MessageThread {...props} />;

export default props => (
  <ListDetailView {...props} rootAs={ScreenRoot}>
    <Route
      path={`${props.match.url}/:channel`}
      children={renderMessageThread}
    />
    <Route path={props.match.url} children={renderThreadList} />
  </ListDetailView>
);
