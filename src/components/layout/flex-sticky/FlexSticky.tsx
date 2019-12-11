import React, { CSSProperties, useRef, useState, RefObject } from 'react';
import useScrollInfo, { ScrollDirection } from '../../../hooks/useScrollInfo';

interface Props {}

const getInfo = (el: RefObject<HTMLDivElement>) => {
    if (el && el.current) {
        const container = el.current.offsetParent;
        if (container) {
            const contentHeight = el.current.offsetHeight;
            const windowHeight = window.innerHeight;
            if (contentHeight < windowHeight) {
                return undefined;
            }
            const containerTop = container.getBoundingClientRect().top;
            const overflow = contentHeight - windowHeight;
            const isSticky = containerTop * -1 > overflow;
            const info: StickyInfo = {
                isSticky,
                stickTopPos: overflow * -1,
                scrollY: window.scrollY
            };
            return info;
        }
    }
    return undefined;
};

interface StickyInfo {
    isSticky: boolean;
    stickTopPos: number;
    scrollY: number;
}

const FlexSticky: React.FunctionComponent<Props> = ({ children }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const containerStyle: CSSProperties = { position: 'relative', height: '100%' };
    const [stickyTop, setStickyTop] = useState<number>(0);
    const stickyInfo = useRef<StickyInfo | undefined>(undefined);
    const [directionChangePos, setDirectionChangePos] = useState<number>(0);

    useScrollInfo((scrollInfo) => {
        const info = getInfo(elementRef);
        if (info) {
            stickyInfo.current = info;
            const { direction, directionChanged } = scrollInfo;
            const dirChangePos = directionChanged ? info.scrollY : directionChangePos;
            if (directionChanged) {
                setDirectionChangePos(dirChangePos);
            }
            const distance = Math.abs(scrollY - dirChangePos);
            if (direction === ScrollDirection.down) {
                const top = Math.max(info.stickTopPos, info.stickTopPos - Math.abs(info.stickTopPos) - distance);
                if (top !== stickyTop) {
                    setStickyTop(top);
                }
            } else if (direction === ScrollDirection.up) {
                const top = Math.min(0, (Math.abs(info.stickTopPos) - distance) * -1);
                if (top !== stickyTop) {
                    setStickyTop(top);
                }
            }
        }
    });
    return (
        <div className="flexSticky" style={containerStyle}>
            <div style={{ position: 'sticky', top: stickyTop }} ref={elementRef}>
                {children}
            </div>
        </div>
    );
};

export default FlexSticky;
