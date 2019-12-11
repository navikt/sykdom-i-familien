import { RefObject, useRef, useLayoutEffect } from 'react';
import { isBrowser } from '../utils/build';

function getScrollPosition({
    element,
    useWindow
}: {
    element?: RefObject<HTMLElement>;
    useWindow?: boolean;
}): ScrollPosition {
    if (!isBrowser) {
        return { x: 0, y: 0 };
    }
    const target = element ? element.current : document.body;
    const position = target ? target.getBoundingClientRect() : { left: 0, top: 0 };
    return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top };
}

export enum ScrollDirection {
    'up' = 'up',
    'down' = 'down',
    'right' = 'right',
    'left' = 'left'
}

export interface ScrollPosition {
    x: number;
    y: number;
}
export interface ScrollPositionChangeEvent {
    prevPos: ScrollPosition;
    currPos: ScrollPosition;
    direction: ScrollDirection;
    directionChanged: boolean;
}

const getScrollDirection = (prev: ScrollPosition, curr: ScrollPosition): ScrollDirection =>
    prev.y > curr.y ? ScrollDirection.down : ScrollDirection.up;

const useScrollInfo = (
    effect: (props: ScrollPositionChangeEvent) => void,
    deps?: any,
    useWindow?: boolean,
    element?: RefObject<HTMLElement>,
    wait?: number
) => {
    const position = useRef(getScrollPosition({ element, useWindow }));
    const scrollDirection = useRef<ScrollDirection | undefined>(undefined);
    let throttleTimeout: number | undefined;

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow });
        const currDirection = getScrollDirection(position.current, currPos);

        const evt: ScrollPositionChangeEvent = {
            prevPos: position.current,
            currPos,
            direction: currDirection,
            directionChanged: currDirection !== scrollDirection.current
        };
        effect(evt);
        scrollDirection.current = currDirection;
        position.current = currPos;
        throttleTimeout = undefined;
    };

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === undefined) {
                    throttleTimeout = window.setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, deps);
};

export default useScrollInfo;
