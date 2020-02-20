import React from "react";
import styled from "styled-components";

import ChatWidget from "widgets/ChatWidget";

// Components ///
import { AnalyticsIcon } from "shared/Icons";
import ScreenRoot from "shared/ScreenRoot";
import FullScreenHeader from "components/FullScreenHeader";

const Root = styled(ScreenRoot)`
  flex: 1;
  overflow-y: scroll;
  padding-bottom: 40px;
`;
export default () => (
  <Root>
    <FullScreenHeader
      icon={AnalyticsIcon}
      text="1000 active chats"
      title="Analytics"
    />
    <ChatWidget />
  </Root>
);
