import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import IconButton from 'shared/IconButton';
import { AttachmentIcon, AddImageIcon, ChevronRightIcon } from 'shared/Icons';
import { Composer } from 'react-web-gifted-chat';

const Root = styled(animated.div)`
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
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
    left: -50%;
`;

const Actions = ({
    actionsWidth,
    actionsOpen,
    openActions,
    setActionsOpen,
    ...props
}) => {
    const [mount, setMount] = useState(true);
    const anim = useSpring({
        value: actionsOpen || !props.text ? 0 : 1,
        config: {
            tension: 140,
            friction: 16,
        },
        onStart: () => {
            if (actionsOpen || (!props.text && !mount)) {
                setMount(true);
            }
        },
        onRest: ({ value }) => {
            if (value) {
                setMount(false);
            }
        },
    });

    const style = {
        opacity: anim.value.interpolate({
            range: [0, 1],
            output: [1, 0],
        }),
        transform: anim.value
            .interpolate({
                range: [0, 1],
                output: [0, actionsWidth / 2],
            })
            .interpolate(value => `translateX(${value}%)`),
    };

    const expandIconStyle = {
        opacity: anim.value.interpolate({
            range: [0, 1],
            output: [0, 1],
        }),
        transform: anim.value
            .interpolate({
                range: [0, 1],
                output: [-actionsWidth / 2, 0],
            })
            .interpolate(value => `translateX(${value}%)`),
    };

    const ref = useCallback(el => {
        if (el) {
            const { width } = el.getBoundingClientRect();
            if (!actionsWidth) {
                props.setActionsWidth(width);
            }
        }
    }, []);

    const handleActionsOpen = useCallback(() => {
        setActionsOpen(true);
    }, [setActionsOpen]);

    return (
        <Root>
            <ExpandWrapper style={expandIconStyle}>
                <IconButton
                    // disabled={!props.text}
                    color="alt_text"
                    icon={ChevronRightIcon}
                    onClick={handleActionsOpen}
                />
            </ExpandWrapper>
            {mount ? (
                <Root {...{ ref, style }}>
                    <IconButton color="alt_text" icon={AttachmentIcon} />
                    <IconButton color="alt_text" icon={AddImageIcon} />
                </Root>
            ) : null}
        </Root>
    );
};

export default Actions;
