import React from 'react';
import styled from 'styled-components';
import { Avatar, Container, Text } from '@comba.se/ui';

// Hooks //
import useAuth from 'hooks/useAuth';

// Forms //
import LoginForm from '../forms/LoginForm';

// Components //
const Root = styled(Container)`
    flex: 1;
    justify-content: center;
`;

const Header = styled.div`
    padding: 32px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Login = () => {
    const [{ organization }] = useAuth();
    return (
        <Root maxWidth={400}>
            <Header>
                <Avatar
                    src={organization.meta.branding.logo}
                    name={organization.name}
                    size={80}
                    showStatus={false}
                />
                <Text size={40} weight="700">
                    {organization.name}
                </Text>
                <Text faded>Customer Support Chat</Text>
            </Header>
            <LoginForm />
        </Root>
    );
};

export default Login;
