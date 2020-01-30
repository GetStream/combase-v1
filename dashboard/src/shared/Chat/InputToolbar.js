import React from 'react';
import styled from 'styled-components';

// HOCs //
import withLayout from 'hocs/withLayout';

// Components //
import Container from 'shared/Container';
import Actions from './Actions';
import Composer from './Composer';
import SendButton from './SendButton';

const Root = styled(Container)`
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
    onSend,
    onTextChanged,
    placeholder,
    setRef,
    text,
    textInputProps,
}) => {
    return (
        <Root ref={setRef} maxWidth={840}>
            <Actions />
            <Composer
                onSend={onSend}
                placeholder={placeholder}
                onTextChanged={onTextChanged}
                text={text}
                textInputProps={textInputProps}
            />
            <SendButton onSend={onSend} text={text} />
        </Root>
    );
};

export default withLayout(InputToolbar);
