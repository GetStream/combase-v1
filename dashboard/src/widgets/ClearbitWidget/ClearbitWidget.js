import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Hooks //
import usePluginEndpoint from "hooks/usePluginEndpoint";
import useLiveMoment from "hooks/useLiveMoment";

// Components //
import Card from "shared/Card";
import Text from "shared/Text";
import {
  JobTitleIcon,
  LinkIcon,
  LocationIcon,
  OrganizationIcon,
  TimeIcon
} from "shared/Icons";
import ListItem from "shared/ListItem";

const Root = styled(Card)``;

const Content = styled.div`
  padding: 8px 0px;
`;

const Credit = styled.div`
  background-color: ${({ theme }) => theme.color.black};
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

const ClearbitWidget = props => {
  const [data, { loading }] = usePluginEndpoint("clearbit", "enrich", props);
  const time = useLiveMoment();

  if (loading && !data) {
    return null;
  }

  return (
    <Root>
      <Content>
        <ListItem
          icon={OrganizationIcon}
          title="Company"
          value={data.employment.name}
        />
        <ListItem
          icon={LinkIcon}
          title="URL"
          value={`https://${data.employment.domain}`}
        />
        <ListItem
          icon={JobTitleIcon}
          title="Title"
          value={data.employment.title}
        />
        <ListItem icon={LocationIcon} title="Location" value={data.location} />
        <ListItem
          icon={TimeIcon}
          title="Current Time"
          value={time.utcOffset(data.utcOffset).format("hh:mma")}
        />
      </Content>
      <Credit>
        <Text color="white" size={12}>
          Powered By Clearbit
        </Text>
      </Credit>
    </Root>
  );
};

ClearbitWidget.propTypes = {
  email: PropTypes.string.isRequired
};

export default ClearbitWidget;
