import React from 'react';
import styled from 'styled-components';

// Components //
import Button from 'shared/Button';
import Container from 'shared/Container';

const Root = styled.div`
    flex: 1;
`;

const Login = () => (
    <Root>
        <Container maxWidth={400}>
            <Button label="Login" />
            <Button flat color="red" label="Forgot Password" />
        </Container>
    </Root>
);

export default Login;
