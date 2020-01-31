import { useCallback, useEffect, useState } from 'react';
import ResizeObserver from 'utils/ResizeObserver';

export default () => {
    const [layout, setLayout] = useState(null);
    const [el, setEl] = useState(null);

    const setRef = useCallback(el => {
        console.log('setRef');
        setEl(el);
    }, []);

    const handleResize = useCallback(entries => {
        console.log(entries);
        const [entry] = entries;
        setLayout(entry.contentRect);
    }, []);

    useEffect(() => {
        const observer = new ResizeObserver(handleResize);
        if (el) {
            observer.observe(el);
            return observer.disconnect();
        }
    }, [el]);

    return [layout, setRef];
};
