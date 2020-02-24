import React from "react";
import { Route } from "react-router-dom";

// Views //
import SettingsDetail from "./views/SettingsDetail";
import SettingsList from "./views/SettingsList";

// Components //
import ListDetailView from "components/ListDetailView";
import ScreenRoot from "shared/ScreenRoot";

const renderSettingsDetail = props => <SettingsDetail {...props} />;
const renderSettingsList = props => <SettingsList {...props} />;

export default props => (
  <ListDetailView {...props} rootAs={ScreenRoot}>
    <Route path={`${props.match.url}/:screen`} children={renderSettingsDetail} />
    <Route path={props.match.url} children={renderSettingsList} />
  </ListDetailView>
);
