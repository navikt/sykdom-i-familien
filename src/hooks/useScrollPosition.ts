import { RefObject, useRef, useLayoutEffect } from 'react';
import { isBrowser } from '../utils/build';

function getScrollPosition({ element, useWindow }: { element?: RefObject<HTMLElement>; useWindow?: boolean }) {
    if (!isBrowser) {
        return { x: 0, y: 0 };
    }
    const target = element ? element.current : document.body;
    const position = target ? target.getBoundingClientRect() : { left: 0, top: 0 };
    return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top };
}

export interface ScrollPositionChangeEvent {
    prevPos: { x: number; y: number };
    currPos: { x: number; y: number };
}

const useScrollPosition = (
    effect: (props: ScrollPositionChangeEvent) => void,
    deps: any,
    useWindow?: boolean,
    element?: RefObject<HTMLElement>,
    wait?: number
) => {
    const position = useRef(getScrollPosition({ element, useWindow }));
    let throttleTimeout: number | undefined;

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow });
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
        throttleTimeout = undefined;
    };

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === undefined) {
                    throttleTimeout = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, deps);
};

export default useScrollPosition;
