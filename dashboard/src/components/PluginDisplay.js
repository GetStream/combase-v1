import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton, Text } from '@comba.se/ui';
import { LinkIcon } from "@comba.se/ui/dist/Icons";

// Components //
import Switch from "components/Switch";
import Chip from "shared/Chip";

const Root = styled.div`
  flex: 1;
`;

const Header = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.border};
  border: 2px solid ${({ theme }) => theme.color.border};
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  margin-top: 16px;
`;

const Title = styled.div`
  flex-direction: row;
  align-items: center;
  & > ${Text} {
    margin-right: ${({ size }) => size / 2}px;
  }
`;

const Description = styled(Text)`
  margin-top: 8px;
  line-height: 20px;
`;

const PluginDisplay = ({
  available,
  avatar,
  avatarSize,
  description,
  descriptionSize,
  enabled,
  onToggle,
  showToggle,
  title,
  titleSize,
  url
}) => {
  return (
    <Root>
      <Header>
        <Logo size={avatarSize}>
          <img alt={title} src={avatar} />
        </Logo>
        {available && showToggle ? (
          <Switch checked={enabled} onChange={onToggle} />
        ) : !available ? (
          <Chip color="gray" size={10} label="Coming Soon" />
        ) : null}
      </Header>
      <Content>
        <Title size={titleSize}>
          <Text size={titleSize} color="alt_text" weight="500">
            {title}
          </Text>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <IconButton size={titleSize} icon={LinkIcon} color="primary" />
          </a>
        </Title>
        <Description faded size={descriptionSize} color="alt_text">
          {description}
        </Description>
      </Content>
    </Root>
  );
};

PluginDisplay.propTypes = {
  available: PropTypes.bool,
  avatar: PropTypes.string.isRequired,
  avatarSize: PropTypes.number,
  description: PropTypes.string.isRequired,
  descriptionSize: PropTypes.number,
  enabled: PropTypes.bool,
  onToggle: PropTypes.func,
  showToggle: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.number,
  url: PropTypes.string.isRequired
};

PluginDisplay.defaultProps = {
  avatarSize: 48,
  descriptionSize: 12,
  titleSize: 16
};

export default PluginDisplay;
