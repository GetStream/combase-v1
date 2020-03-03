import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FAB } from "@comba.se/ui";
import { SendIcon } from "@comba.se/ui/dist/Icons";

// Hooks //
import useMedia from 'hooks/useMedia';

// Components //
import IconButton from 'shared/IconButton';

const Button = styled(FAB)`
    position: absolute;
    top: -28px;
    right: 0;
`;

const SendButton = ({ onSend, text }) => {
    const isMobile = useMedia('sm');
    const onClick = useCallback(() => {
        onSend({ text: text.trim() }, true);
    }, [text, onSend]);

    if (isMobile) {
        return (
            <IconButton
                {...{ onClick }}
                disabled={!text}
                icon={SendIcon}
                color="primary"
            />
        );
    }
    return text ? (
        <Button
            disablePortal
            icon={SendIcon}
            size={64}
            unmount={!text}
            {...{ onClick }}
        />
    ) : null;
};

export default SendButton;
