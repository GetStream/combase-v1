import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import IconButton from 'shared/IconButton';
import { AttachmentIcon, AddImageIcon } from 'shared/Icons';

const Root = styled(animated.div)`
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    & > * + * {
        margin-left: 8px;

        @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
            margin-left: 16px;
        }
    }
`;

const Actions = props => {
    const anim = useSpring({
        value: !props.text ? 1 : 0,
        config: {
            tension: 140,
            friction: 16,
        },
    });

    const style = {
        opacity: anim.value,
        transform: anim.value
            .interpolate({
                range: [0, 1],
                output: [-100, 0],
            })
            .interpolate(value => `translateX(${value}%)`),
    };

    const ref = useCallback(el => {
        if (el) {
            const { width } = el.getBoundingClientRect();
            props.setActionsWidth(width);
        }
    }, []);

    return (
        <Root {...{ ref, style }}>
            <IconButton color="alt_text" icon={AttachmentIcon} />
            <IconButton color="alt_text" icon={AddImageIcon} />
        </Root>
    );
};

export default Actions;
