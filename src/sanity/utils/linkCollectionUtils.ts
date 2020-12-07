import { getSanityStringWithLocale } from '../../utils/sanity/getSanityContentWithLocale';
import { LinkCollectionItem } from '../components/sanity-link-collection/SanityLinkCollection';
import { FrontpageLinkObject, FrontpagePageLinkObject } from '../types/objects';

const mapFromFrontpageLinkObject = (item: FrontpageLinkObject, locale: string): LinkCollectionItem => {
    return {
        title: getSanityStringWithLocale(item.title, locale),
        illustration: item.illustration,
        url: item.url,
        description: item.content ? getSanityStringWithLocale(item.content, locale) : undefined,
        isPageSlug: false,
    };
};
const mapFromFrontpagePageLinkObject = (item: FrontpagePageLinkObject, locale: string): LinkCollectionItem => {
    const returnItem = {
        title: getSanityStringWithLocale(item.page.title, locale),
        illustration: item.illustration,
        url: `/${item.page.slug.current}`,
        description: item.content ? getSanityStringWithLocale(item.content, locale) : undefined,
        isPageSlug: true,
    };
    return returnItem;
};

export const mapLinkCollectionItem = (
    item: FrontpagePageLinkObject | FrontpageLinkObject,
    locale: string
): LinkCollectionItem => {
    switch (item._type) {
        case 'frontpageLink':
            return mapFromFrontpageLinkObject(item, locale);
        case 'frontpagePageLink':
            return mapFromFrontpagePageLinkObject(item, locale);
    }
};
