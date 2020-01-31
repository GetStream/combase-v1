import React from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';

export default styled.div`
    flex-direction: row;
    align-items: center;
    & > * + * {
        margin-left: 16px;
    }
`;