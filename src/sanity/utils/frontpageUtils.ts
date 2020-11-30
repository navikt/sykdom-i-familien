import { getSanityStringWithLocale } from '../../utils/sanity/getSanityContentWithLocale';
import { Site } from '../../utils/site';
import { IllustrationDocument, MessageDocument } from '../types/documents';

interface FrontpageStory {
    title?: string;
    description?: string;
    illustration: IllustrationDocument;
    url: string;
    isPageSlug: boolean;
}

export interface FrontpageSanityData {
    site: Site;
    showLanguageToggle: boolean;
    title: string;
    metadescription: string;
    ingress?: string;
    illustration: IllustrationDocument;
    stories?: FrontpageStory[];
    message?: MessageDocument;
    content: any[];
}
export const extractFrontpageData = (data: any, locale: string): FrontpageSanityData | undefined => {
    const { nodes } = data?.allSanityFrontpage || {};
    if (!nodes || nodes.length === 0) {
        return undefined;
    }
    const {
        site,
        showLanguageToggle,
        _rawIllustration,
        _rawIngress,
        _rawTitle,
        _rawContent,
        _rawMessage,
        _rawFrontpageStories,
        _rawMetadescription,
    } = nodes[0];

    return {
        site,
        showLanguageToggle: showLanguageToggle === true,
        title: getSanityStringWithLocale(_rawTitle, locale),
        ingress: getSanityStringWithLocale(_rawIngress, locale),
        metadescription: getSanityStringWithLocale(_rawMetadescription, locale),
        illustration: _rawIllustration,
        message: _rawMessage,
        content: _rawContent,
        stories: (_rawFrontpageStories || []).map((story: any) => {
            return {
                title: getSanityStringWithLocale(story.title || story.page.title, locale),
                description: getSanityStringWithLocale(story.content, locale),
                illustration: story.illustration,
                isPageSlug: story._type === 'frontpagePageLink',
                url: story._type === 'frontpageLink' ? story.url : story.page.slug ? `/${story.page.slug.current}` : '',
            };
        }),
    };
};
