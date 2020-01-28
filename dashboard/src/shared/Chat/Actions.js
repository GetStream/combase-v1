import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import IconButton from 'shared/IconButton';
import { AttachmentIcon, AddImageIcon, ChevronRightIcon } from 'shared/Icons';

const Root = styled(animated.div)`
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
    z-index: 2;

    & > * + * {
        margin-left: 8px;

        @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
            margin-left: 16px;
        }
    }
`;

const ExpandWrapper = styled(animated.div)`
    position: absolute;
    left: 16px;
`;

const Actions = props => {
    return (
        <Root>
            {/* <ExpandWrapper style={expandIconStyle}>
                <IconButton
                    // disabled={!props.text}
                    color="alt_text"
                    icon={ChevronRightIcon}
                    onClick={handleActionsOpen}
                />
            </ExpandWrapper> */}
            <IconButton color="alt_text" icon={AttachmentIcon} />
            <IconButton color="alt_text" icon={AddImageIcon} />
        </Root>
    );
};

export default Actions;
