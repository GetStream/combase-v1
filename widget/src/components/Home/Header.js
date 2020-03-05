import React from 'react';
import styled from 'styled-components';
import { Container, Text } from '@comba.se/ui';

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
    padding-bottom: 64px;
    & ${Container} {
        flex: 1;
        justify-content: flex-end;
    }
`

const Header = () => {
    return (
        <>
            <Background />
            <Root>
                <Container>
                    <Text>Test</Text>
                </Container>
            </Root>
        </>
    );
};

export default Header;