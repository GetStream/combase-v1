import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import IconButton from 'shared/IconButton';
import { AttachmentIcon, AddImageIcon, ChevronRightIcon } from 'shared/Icons';

const Root = styled(animated.div)`
    position: absolute;
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
    z-index: 2;

    & > & {
        margin-right: 0px;
    }

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
    const [mount, setMount] = useState(true);
    
    const anim = useSpring({
        value: !!props.text ? 0 : 1,
        config: {
            tension: 200,
            friction: 18,
        },
        onStart: (value) => {
            if (!mount) {
                setMount(true);
            }
        },
        onRest: ({ value }) => {
            if (mount && value === 0) {
                setMount(false);
            }

            if (!mount && value === 1) {
                setMount(true);
            }
        }
    });

    const ref = useCallback((el) => {
        if (el) {
            const { clientWidth } = el;
            if (clientWidth && clientWidth !== props.actionsWidth) {
                props.setActionsWidth(clientWidth);
            }
        }
    }, [props.actionsWidth]);

    const style = {
        opacity: anim.value,
    };

    const expandStyle = {
        opacity: anim.value.interpolate({
            range: [0, 1],
            output: [1, 0]
        }),
        transform: anim.value.interpolate({
            range: [0, 1],
            output: [0, -100]
        }).interpolate(v => `translateX(${v}%)`)
    }

    return (
        <Root>
            <ExpandWrapper style={expandStyle}>
                <IconButton
                    disabled={!props.text}
                    color="alt_text"
                    icon={ChevronRightIcon}
                    // onClick={handleActionsOpen}
                />
            </ExpandWrapper>
            {mount ? (
                <Root {...{ref, style}}>
                    <IconButton color="alt_text" icon={AttachmentIcon} />
                    <IconButton color="alt_text" icon={AddImageIcon} />
                </Root>
            ) : null}
        </Root>
    );
};

export default Actions;
