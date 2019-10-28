import { useState, useEffect } from 'react';
import { isBrowser } from '../utils/build';

const getWindowSize = () => {
    return isBrowser()
        ? {
              height: window.innerHeight,
              width: window.innerWidth
          }
        : { width: 1000, height: 600 };
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
