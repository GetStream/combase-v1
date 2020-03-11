import React from 'react';
import styled from 'styled-components';
import { Avatar, Container, Fill, Text } from '@comba.se/ui';

// Hooks //
import useAuth from 'hooks/useAuth';

// Components //
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.primary};
`

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    padding: 64px 16px;
    & ${Container} {
        flex: 1;
        justify-content: flex-end;
    }
`

const Brand = styled.div`
    margin-bottom: 24px;
    flex-direction: row; 
    align-items: center;
`

const OrgMeta = styled.div`
    margin-left: 16px;
`

const Header = () => {
    const [{ organization }] = useAuth();
    console.log(organization);
    return (
        <>
            <Background />
            <Root>
                <Container>
                    <Brand>
                        <Avatar showStatus={false} size={72} name={organization.name} src={organization.meta.branding.logo} />
                        <OrgMeta>
                            <Text color="white" size={32} weight="700">
                                {organization.name}
                            </Text>
                            <Text faded color="white" size={12} weight="500">
                                {organization.meta.tagline}
                            </Text>
                        </OrgMeta>
                    </Brand>
                    <Fill />
                    <Text size={24} weight="600" color="white">Hello, Josh! <span role="img" aria-label="Waving">👋</span></Text>
                </Container>
            </Root>
        </>
    );
};

export default Header;