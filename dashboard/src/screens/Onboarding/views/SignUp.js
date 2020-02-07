import React from 'react';
import styled from 'styled-components';

// Forms //
import SignUpForm from '../forms/SignUpForm';

// Components //
import Container from 'shared/Container';
import Text from 'shared/Text';

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

const SignUp = () => {
    return (
        <Root maxWidth={400}>
            <Header>
                <Text size={40} weight="700">
                    Create an Account
                </Text>
            </Header>
            <SignUpForm />
        </Root>
    );
};

export default SignUp;
