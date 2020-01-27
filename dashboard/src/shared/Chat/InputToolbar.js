import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    flex: 1;
    flex-direction: row;
    padding: 16px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding-right: 88px;
    }
`;

const InputToolbar = ({
    renderActions,
    renderComposer,
    renderSend,
    ...props
}) => {
    return (
        <Root>
            {renderActions(props)}
            {renderComposer(props)}
            {props.text ? renderSend(props) : null}
        </Root>
    );
};

export default InputToolbar;
