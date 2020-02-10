import React from 'react';
import styled from 'styled-components';

// Components //
import Avatar from 'shared/Avatar';
import Logo from 'shared/Logo';
import StreamLogo from 'shared/StreamLogo';
import SidenavItem from './SidenavItem';

const Root = styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 96px;
    z-index: ${({ theme }) => theme.z.sidenav};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        display: flex;
    }
`;

const Brand = styled.div`
    justify-content: center;
    align-items: center;
    padding: 24px 0px;
`;

const Menu = styled.div`
    flex: 1;
    width: 100%;
    margin-top: 24px;
`;

const Footer = styled.div`
    padding: 24px 0px;
    align-items: center;
    justify-content: center;

    & > * + * {
        margin-top: 16px;
    }
`;

const renderItems = (routes, match) =>
    routes.map(({ component, ...route }, key) => (
        <SidenavItem
            {...{ key }}
            {...route}
            path={`${match.url}${route.slug}`}
        />
    ));

export default ({ match, routes }) => {
    return (
        <Root>
            <Brand>
                <Logo size={56} />
            </Brand>
            <Menu>{renderItems(routes, match)}</Menu>
            <Footer>
                <Avatar size={48} name="Luke" src="" showStatus={false} />
                <a
                    href="https://getstream.io/chat/?utm_source=combase&utm_medium=cta&utm_campaign=combase"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <StreamLogo size={40} />
                </a>
            </Footer>
        </Root>
    );
};
