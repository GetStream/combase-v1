import { useCallback, useEffect, useMemo, useState } from 'react';
import ResizeObserver from '@comba.se/ui/utils/ResizeObserver';

export default onResize => {
    const [ref, setElRef] = useState(null);
    const [layout, setLayout] = useState(null);

    const handleResize = useCallback(
        entries => {
            const [entry] = entries;
            const { blockSize: height, inlineSize: width } = entry;
            console.log('dims', width, height)
            setLayout({ width, height });

            if (onResize) {
                onResize({ width, height });
            }
        },
        [onResize]
    );

    const observer = useMemo(() => new ResizeObserver(handleResize), [handleResize]);

    useEffect(() => {
        if (ref) {
            observer.observe(ref, {
                box: 'border-box',
            });
        }
        return () => observer.disconnect();
    }, [observer, ref]);

    const setRef = useCallback(
        el => {
            if (!ref && el) {
                setElRef(el);
            }
        },
        [ref]
    );

    return [layout, setRef];
};
