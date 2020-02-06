import React from 'react';
import styled from 'styled-components';

// Forms //
import LoginForm from '../forms/LoginForm';

// Components //
import Container from 'shared/Container';

const Root = styled.div`
    flex: 1;
`;

const Login = () => (
    <Root>
        <Container maxWidth={400}>
            <LoginForm />
        </Container>
    </Root>
);

export default Login;
