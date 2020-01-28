import React from 'react';
import styled from 'styled-components';

// Components //
import Loader from 'shared/Loader';

const Root = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const LoadingState = () => {
    return (
        <Root>
            <Loader />
        </Root>
    );
};

export default LoadingState;
