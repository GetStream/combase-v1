import React from 'react';
import styled from 'styled-components';

export default styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1152px;
    padding-left: 16px;
    padding-right: 16px;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding-left: 24px;
        padding-right: 24px
    }
`;