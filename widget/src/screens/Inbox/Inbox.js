import React from 'react';
import styled from 'styled-components';
import { Text } from '@comba.se/ui';

// Components //
const Root = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Inbox = () => {
    return (
        <Root>
            <Text>Inbox</Text>
        </Root>
    );
};

export default Inbox;