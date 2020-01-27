import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    flex: 1;
    flex-direction: row;
    padding: 16px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
`;

const InputToolbar = ({
    renderActions,
    renderComposer,
    renderSend,
    ...props
}) => {
    return (
        <Root>
            {/* {renderActions()} */}
            {renderComposer(props)}
            {renderSend(props)}
        </Root>
    );
};

export default InputToolbar;
