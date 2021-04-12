import useScrollInfo, { ScrollPositionChangeEvent } from './useScrollInfo';
import { isBrowser } from '../utils/build';

interface SectionPosition {
    id: string;
    yPos: number;
}
function getSectionPositions(sectionIds: string[]): SectionPosition[] | undefined {
    if (isBrowser) {
        return sectionIds
            .map((id) => {
                const el = document.getElementById(id);
                const pos = el
                    ? {
                          id,
                          yPos: el.offsetTop,
                      }
                    : undefined;
                return pos;
            })
            .filter((el) => el !== undefined) as SectionPosition[];
    }
    return undefined;
}

const getActiveSection = (scrollPos: number, positions: SectionPosition[] | undefined, offset: number = 0) => {
    if (positions !== undefined) {
        const section = positions.reverse().find(({ yPos }) => yPos + offset < scrollPos * -1);
        return section ? section.id : undefined;
    }
    return undefined;
};

const useActiveSections = (
    sectionIds: string[],
    callback: (id: string | undefined) => void,
    offset: number,
    deps?: any
) => {
    const handleScrollChange = (evt: ScrollPositionChangeEvent) => {
        const positions = getSectionPositions(sectionIds);
        const activeSection = getActiveSection(evt.currPos.y, positions, offset);
        callback(activeSection);
    };
    useScrollInfo(handleScrollChange, deps, false, undefined, 400);
};

export default useActiveSections;
