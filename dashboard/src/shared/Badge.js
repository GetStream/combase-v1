import React from 'react';
import styled from 'styled-components';
import { Text } from '@comba.se/ui';

// Components //
const Root = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.red};
`;

export default ({ count, size, ...rest }) => (
    <Root {...{ size }} {...rest}>
        <Text color="white" size={size / 2}>
            {count}
        </Text>
    </Root>
);
