import React, { useCallback } from 'react';
import styled from 'styled-components';

// Components //
import { SendIcon } from 'shared/Icons';
import FAB from 'shared/FAB';

const Button = styled(FAB)`
    position: absolute;
    top: -50%;
`;

const SendButton = ({ onSend, text }) => {
    const onClick = useCallback(() => {
        onSend({ text: text.trim() }, true);
    }, [text]);
    return <Button disablePortal icon={SendIcon} size={64} {...{ onClick }} />;
};

export default SendButton;
