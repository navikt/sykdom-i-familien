import { useState, useEffect } from 'react';

const getWindowSize = () => {
    return {
        height: window.innerHeight,
        width: window.innerWidth
    };
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const onResize = (event: any) => {
        if (event.target) {
            setWindowSize({ height: event.target.innerHeight, width: event.target.innerWidth });
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });

    return windowSize;
};

export default useWindowSize;
