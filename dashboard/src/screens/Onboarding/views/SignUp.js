import React from 'react';
import styled from 'styled-components';

// Forms //
import SignUpForm from '../forms/SignUpForm';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    justify-content: center;
`;

const Header = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 32px;
`;
const SignUp = () => {
    return (
        <Root>
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
