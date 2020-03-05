import React from 'react';
import styled from 'styled-components';
import { Card } from "@comba.se/ui";

// Components //
const Root = styled(Card)`
    width: 100%;  
    padding: 40px;
`;

const ThreadsWidget = () => {
    return (
        <Root>
            Threads
        </Root>
    );
};

export default ThreadsWidget;