import React from 'react';
import styled from 'styled-components';
import { Button } from "@comba.se/ui";

// Components //
const Root = styled.div`
    padding: 16px;
    margin-top: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CardFooter = () => {
    return (
        <Root>
            <div />
            <Button flat label="New Conversation" />
        </Root>
    );
};

export default CardFooter;