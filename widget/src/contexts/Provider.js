import React, { useCallback, useEffect, useMemo } from 'react';
import { useSpring } from 'react-spring';
import Context from './index';

export default ({ children, target = window, scrollAnimDistance = 120 }) => {
    const [anim, set] = useSpring(() => ({ value: 0 }));
    const onScroll = useCallback(e => set({ value: window.scrollY }), [set])

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    const value = useMemo(() => ({
        anim,
    }), [anim]);

    return (
        <Context.Provider {...{ value }}>
            {children}
        </Context.Provider>
    );
}