import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Utils //
import history from 'utils/history';

// Components //
import Switch from 'components/Switch';
import Card from 'shared/Card';
import Text from 'shared/Text';
import Fill from 'shared/Fill';
import { SettingsIcon, LinkIcon } from 'shared/Icons';
import IconButton from 'shared/IconButton';

const Root = styled(Card)`
    padding: 20px;
    flex: 1;
    & ${Text} {
        user-select: none;
    }
`;

const Header = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.light_gray};
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
        margin-right: 8px;
    }
`;

const Description = styled(Text)`
    margin-top: 8px;
    line-height: 20px;
`;

const Footer = styled.div`
    margin-top: 16px;
    flex-direction: row;
    justify-content: flex-end;
`;

const PluginCard = ({ avatar, description, slug, title, url }) => (
    <Root border flat>
        <Header>
            <Logo>
                <img alt={title} src={avatar} />
            </Logo>
            <Switch />
        </Header>
        <Content>
            <Title>
                <Text color="alt_text" weight="500">
                    {title}
                </Text>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <IconButton size={16} icon={LinkIcon} color="primary" />
                </a>
            </Title>
            <Description faded size={12} color="alt_text">
                {description}
            </Description>
        </Content>
        <Fill />
        <Footer>
            <IconButton
                onClick={() => history.push(`/plugins/${slug}`)}
                icon={SettingsIcon}
                size={16}
                color="alt_text"
            />
        </Footer>
    </Root>
);

PluginCard.propTypes = {
    avatar: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
};

export default memo(PluginCard);
