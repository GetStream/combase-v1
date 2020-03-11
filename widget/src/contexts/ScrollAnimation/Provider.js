import React, { useCallback, useEffect, useMemo } from 'react';
import { useSpring } from 'react-spring';
import { window } from 'browser-monads';
import Context from './index';

export default ({ children, target = window }) => {
    const [anim, set] = useSpring(() => ({ value: 0, config: { mass: 1, tension: 500, friction: 30 } }));
    const onScroll = useCallback(({ target: eventTarget }) => set({ value: eventTarget.scrollTop }), [set])

    useEffect(() => {
        if (!!target) {
            target.addEventListener('scroll', onScroll);
            return () => target.removeEventListener('scroll', onScroll);
        }
    }, [onScroll, target]);

    const value = useMemo(() => ({
        anim,
    }), [anim]);

    return (
        <Context.Provider {...{ value }}>
            {children}
        </Context.Provider>
    );
}