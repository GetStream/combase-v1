import React from 'react';
import styled from 'styled-components';
import { Text } from '@comba.se/ui';

// Components //
const Root = styled.div`
    flex-direction: row;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px){
        padding-left: 16px;
        padding-right: 16px;
    }
`;

const SectionTitle = ({ className, title }) => (
    <Root {...{ className }}>
        <Text color="alt_text" faded weight="500">
            {title}
        </Text>
    </Root>
);

export default SectionTitle;
