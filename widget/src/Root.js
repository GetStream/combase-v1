import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FAB } from '@comba.se/ui';
import { InboxIcon } from '@comba.se/ui/Icons';
import { animated, useSpring } from 'react-spring';
import { useStore } from 'contexts/Store';

// Screens //
import Home from 'screens/Home';

// Components //
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
`

const Launcher = styled(FAB)`
    position: fixed;
`

const Root = () => {
    const [mounted, setMounted] = useState(false);
    const [{ isOpen }, { toggleWidget }] = useStore();
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

    return (
        <>
            {mounted ? (
                <WidgetRoot style={style}>
                    <Header />
                    <Switch>
                        <Home active />
                    </Switch>
                </WidgetRoot>
            ) : null}
            <Launcher icon={InboxIcon} onClick={handleClick} />
        </>
    )
}

export default Root;