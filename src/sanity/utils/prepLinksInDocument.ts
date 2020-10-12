import slugify from 'slugify';
import traverse from 'traverse';
import { getSanityStringWithLocale } from '../../utils/sanity/getSanityContentWithLocale';

export const getAndApplyLinksInContent = (data: any) => {
    const links: any[] = [];
    const blocksWithMarks: any[] = [];
    let linkCounter = 1;

    const dataWithLinkNumbers = traverse(data).map((node) => {
        if (node && typeof node === 'object') {
            if (node._type === 'link' && node.href !== undefined) {
                const isExternal = isUrlExternal(node.href);
                const modifiedNode = { ...node, linkNumber: linkCounter, isExternal };
                links.push(modifiedNode);
                linkCounter++;
                return modifiedNode;
            } else if (node.marks) {
                blocksWithMarks.push(node);
            }
        }
        return node;
    });

    return {
        data: dataWithLinkNumbers,
        links: links.map((link) => {
            const node = blocksWithMarks.find((block) => block.marks.find((m: any) => m === link._key));
            return !node || !link.href
                ? undefined
                : {
                      url: link.href,
                      _key: link._key,
                      text: node.text,
                      isExternal: isUrlExternal(link.href),
                      linkNumber: link.linkNumber
                  };
        })
    };
};

export const createAnchorsForTabsWithinSections = (data: any, locale: string) => {
    let currentSection: any = null;

    const dataWithTabSlugs = traverse(data).map((node) => {
        if (node && typeof node === 'object') {
            if (node._type === 'section') {
                currentSection = node;
            }
            if (node._type === 'tabs' && currentSection !== undefined) {
                const title = getSanityStringWithLocale(currentSection.title, locale);
                return title ? { ...node, sectionSlug: slugify(title) } : node;
            }
            return node;
        }
        return node;
    });

    return dataWithTabSlugs;
};

const isUrlExternal = (url: string): boolean => {
    return !url ? false : url.indexOf('nav.no') === -1;
};
