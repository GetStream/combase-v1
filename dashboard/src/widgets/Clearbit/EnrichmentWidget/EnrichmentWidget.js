import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Text } from '@comba.se/ui';
import {
  JobTitleIcon,
  LinkIcon,
  LocationIcon,
  OrganizationIcon,
  TimeIcon
} from "@comba.se/ui/Icons";

// Hooks //
import usePluginEndpoint from "hooks/usePluginEndpoint";
import useLiveMoment from "hooks/useLiveMoment";

// Components //
import ListItem from "shared/ListItem";

const Root = styled(Card)``;

const Content = styled.div`
  padding: 8px 0px;
`;

const Credit = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  background-color: ${({ theme }) => theme.color.black};
  padding: 8px;
  justify-content: center;
  align-items: center;

  & > ${Text} {
    display: flex;
    align-items: center;

    & img {
      margin: 0px 8px;
      width: 16px;
      height: 16px;
      background-color: ${({ theme }) => theme.color.white};
      border-radius: 50%;
    }
  }
`;

const ClearbitWidget = props => {
  const [data] = usePluginEndpoint("clearbit", "enrich", props);
  const time = useLiveMoment();

  return (
    <Root flat border>
      <Content>
        <ListItem
          icon={OrganizationIcon}
          title="Company"
          value={data.employment ? data.employment.name : null}
        />
        <ListItem
          icon={LinkIcon}
          title="URL"
          value={data.employment ? `https://${data.employment.domain}` : null}
        />
        <ListItem
          icon={JobTitleIcon}
          title="Title"
          value={data.employment ? data.employment.title : null}
        />
        <ListItem icon={LocationIcon} title="Location" value={data ? data.location : null} />
        <ListItem
          icon={TimeIcon}
          title="Current Time"
          value={data.utcOffset ? time.utcOffset(data.utcOffset).format("hh:mma") : null}
        />
      </Content>
      <Credit>
        <Text color="white" size={12}>
          Powered by <img src="https://logo.clearbit.com/clearbit.com" alt="Clearbit" /> Clearbit
        </Text>
      </Credit>
    </Root>
  );
};

ClearbitWidget.propTypes = {
  email: PropTypes.string.isRequired
};

export default ClearbitWidget;
