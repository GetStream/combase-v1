import React from 'react';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

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
