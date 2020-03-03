import React from 'react';
import styled from 'styled-components';
import { Text } from '@comba.se/ui';

// Components //
const Root = styled.div`
    margin: 20px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
    user-select: none;
`;

const Bubble = styled.div`
    padding: 8px 12px;
    border-radius: 9999px;
    background-color: ${({ color, theme }) =>
        theme.colorUtils.fade(theme.color[color], 0.16)};
`;

const SystemMessage = ({ currentMessage: { color, text, error } }) => (
    <Root>
        <Bubble color={color ? color : error ? 'error' : 'primary'}>
            <Text
                size={12}
                weight="600"
                color={color ? color : error ? 'error' : 'primary'}
            >
                {text}
            </Text>
        </Bubble>
    </Root>
);

export default SystemMessage;
