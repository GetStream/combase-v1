import React from 'react';
import styled from 'styled-components';
import { Container, Text } from '@comba.se/ui';

// Hooks //
import useAuth from 'hooks/useAuth';

// Components //
import OrganizationCard from 'components/OrganizationCard';

const Root = styled.div`
    flex: 1;
    justify-content: center;
    & > ${Container} {
        flex: 1;
        justify-content: center;
        align-items: center;
    }
`;

const Header = styled.div`
    padding: 32px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const renderOrganizations = (org, key) => {
    return (
        <OrganizationCard
            id={org._id}
            logo={org.meta.branding.logo}
            name={org.name}
            tagline={org.meta.tagline}
        />
    );
};

const Welcome = () => {
    const [{ organizations }] = useAuth();
    return (
        <Root>
            <Header>
                <Text size={24} weight="500">
                    Combase
                </Text>
                <Text size={40} weight="700">
                    Choose an Organization
                </Text>
            </Header>
            <Container maxWidth={1280}>
                {organizations.map(renderOrganizations)}
            </Container>
        </Root>
    );
};

export default Welcome;
