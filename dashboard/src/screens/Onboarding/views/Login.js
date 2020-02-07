import React from 'react';
import styled from 'styled-components';

// Forms //
import LoginForm from '../forms/LoginForm';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    justify-content: center;
`;

const Header = styled.div`
    padding: 32px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Login = () => (
    <Root>
        <Header>
            <Text size={40} weight="700">
                Combase
            </Text>
        </Header>
        <LoginForm />
    </Root>
);

export default Login;
