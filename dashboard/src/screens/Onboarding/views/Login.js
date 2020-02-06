import React from 'react';
import styled from 'styled-components';

// Forms //
import LoginForm from '../forms/LoginForm';

// Components //
import Container from 'shared/Container';
import StreamLogo from 'shared/StreamLogo';
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    & > ${Container} {
        flex: 1;
        justify-content: center;
    }
`;

const Header = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 32px;
`;

const Credit = styled.div`
    padding: 40px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Login = () => (
    <Root>
        <Container maxWidth={400}>
            <Header>
                <Text size={40} weight="700">
                    Combase
                </Text>
            </Header>
            <LoginForm />
        </Container>
        <Credit>
            <StreamLogo size={40} />
            <Text size={14} faded>
                Powered by Stream.
            </Text>
        </Credit>
    </Root>
);

export default Login;
