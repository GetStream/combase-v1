import React from 'react';
import styled from 'styled-components';

// Components //
import { SendIcon } from 'shared/Icons';
import FAB from 'shared/FAB';

const Button = styled(FAB)`
    position: absolute;
    top: -50%;
`;

const SendButton = () => <Button disablePortal icon={SendIcon} size={64} />;

export default SendButton;
