import React, { useEffect } from 'react';
import styled from 'styled-components';

// Components //
import Container from 'shared/Container';

const Root = styled(Container)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding-right: 88px;
    }
`;

const InputToolbar = ({
    renderActions,
    renderComposer,
    renderSend,
    onInputSizeChanged,
    ...props
}) => {
    return (
        <Root maxWidth={840}>
            {renderActions(props)}
            {renderComposer(props)}
            {renderSend(props)}
        </Root>
    );
};

export default InputToolbar;
