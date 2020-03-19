import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CardFooter = ({ children }) => (
    <Root>
        <div />
        {children}
    </Root>
);

export default CardFooter;