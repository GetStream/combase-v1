import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { FAB, Portal } from '@comba.se/ui';
import { InboxIcon } from '@comba.se/ui/Icons';
import { animated, useSpring } from 'react-spring';
import { useStore } from 'contexts/Store';
import { useAuth } from 'contexts/Auth';
import { ScrollAnimationProvider } from 'contexts/ScrollAnimation';

// Screens //
import Home from 'screens/Home';
import Thread from 'screens/Thread';

// Components //
import Credit from 'components/Credit';
import Header from 'components/Header';
import Switch from 'components/Switch';

const WidgetRoot = styled(animated.div)`
    position: fixed;
    bottom: 120px;
    right: 32px;
    width: 400px;
    height: 600px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    z-index: 9;
`

const ScrollWrapper = styled.div`
   flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 0px;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
`

const Launcher = styled(FAB)`
    position: fixed;
`

const Root = () => {
    const [scrollRef, setScrollRef] = useState(null);
    const [mounted, setMounted] = useState(false);
    const { user } = useAuth();

    const [{ activeChannel, isOpen }, { toggleWidget }] = useStore();
    const { value: anim } = useSpring({
        value: isOpen ? 1 : 0, config: { mass: 1, friction: 20, tension: 300 }, onRest: ({ value }) => {
            if (value === 0) {
                setMounted(false);
            }
        }
    })

    const style = useMemo(() => ({
        transform: anim.interpolate({
            range: [0, 1],
            output: [24, 0],
        }).interpolate(v => `translate3d(0, ${v}px, 0)`),
        opacity: anim
    }), [anim]);

    const handleClick = useCallback(() => {
        if (!mounted) {
            setMounted(true);
            toggleWidget();
        } else {
            toggleWidget();
        }
    }, []);

    const handleScrollRef = useCallback((el) => {
        if (!scrollRef && el) {
            setScrollRef(el);
        }
    }, []);

    return (
        <>
            <Portal unmount={!mounted}>
                <ScrollAnimationProvider target={scrollRef}>
                    <WidgetRoot style={style}>
                        <ScrollWrapper ref={handleScrollRef}>
                            <Switch>
                                <Home active={!activeChannel} />
                                <Thread active={!!activeChannel} channelId={activeChannel} />
                            </Switch>
                            <Header shrunk={!!activeChannel} />
                        </ScrollWrapper>
                        <Credit />
                    </WidgetRoot>
                </ScrollAnimationProvider>
            </Portal>
            <Launcher icon={InboxIcon} onClick={handleClick} />
        </>
    )
}

export default Root;