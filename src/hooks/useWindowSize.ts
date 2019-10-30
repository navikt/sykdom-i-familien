import { useState, useEffect } from 'react';
import { isBrowser } from '../utils/build';

const getWindowSize = () => {
    return isBrowser
        ? {
              height: window.innerHeight,
              width: window.innerWidth
          }
        : { width: 1000, height: 600 };
};

export interface WindowSize {
    width: number;
    height: number;
}

const useWindowSize = (callback?: (size: WindowSize) => void) => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const onResize = (event: any) => {
        if (event.target) {
            const size = { height: event.target.innerHeight, width: event.target.innerWidth };
            setWindowSize(size);
            if (callback) {
                callback(size);
            }
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
