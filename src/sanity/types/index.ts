export type SanityContentHeadingLevel = 2 | 3 | 4 | 5 | 6;

export const isSanityContentHeadingLevel = (
    toBeDetermined: SanityContentHeadingLevel | any
): toBeDetermined is SanityContentHeadingLevel => {
    return (
        toBeDetermined === 2 ||
        toBeDetermined === 3 ||
        toBeDetermined === 4 ||
        toBeDetermined === 5 ||
        toBeDetermined === 6
    );
};
