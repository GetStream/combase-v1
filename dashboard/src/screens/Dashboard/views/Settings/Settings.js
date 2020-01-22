import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

// Views //
import SettingsDetail from "./views/SettingsDetail";
import SettingsList from "./views/SettingsList";

// Components //
import ListDetailView from "components/ListDetailView";
import ScreenRoot from "components/ScreenRoot";

const renderSettingsDetail = props => <SettingsDetail {...props} />;
const renderSettingsList = props => <SettingsList {...props} />;

export default props => (
  <ListDetailView {...props} rootAs={ScreenRoot}>
    <Route path={`${props.match.url}/:view`} children={renderSettingsDetail} />
    <Route path={props.match.url} children={renderSettingsList} />
  </ListDetailView>
);
