import { getSanityStringWithLocale } from '../../utils/sanity/getSanityContentWithLocale';
import { IllustrationDocument, MessageDocument } from '../types/documents';

interface FrontpageStory {
    title?: string;
    description?: string;
    illustration: IllustrationDocument;
    url: string;
    isPageSlug: boolean;
}

export interface FrontpageSanityData {
    showLanguageToggle: boolean;
    title: string;
    metadescription: string;
    ingress?: string;
    illustration: IllustrationDocument;
    stories?: FrontpageStory[];
    message?: MessageDocument;
}
export const extractFrontpageData = (data: any, locale: string): FrontpageSanityData => {
    const {
        showLanguageToggle,
        _rawIllustration,
        _rawIngress,
        _rawTitle,
        _rawMessage,
        _rawFrontpageStories,
        _rawMetadescription,
    } = data.allSanityFrontpage.nodes[0];

    return {
        showLanguageToggle: showLanguageToggle === true,
        title: getSanityStringWithLocale(_rawTitle, locale),
        ingress: getSanityStringWithLocale(_rawIngress, locale),
        metadescription: getSanityStringWithLocale(_rawMetadescription, locale),
        illustration: _rawIllustration,
        message: _rawMessage,
        stories: (_rawFrontpageStories || []).map((story: any) => {
            return {
                title: getSanityStringWithLocale(
                    story._type === 'frontpageLink' ? story.title : story.page.title,
                    locale
                ),
                description: getSanityStringWithLocale(story.content, locale),
                illustration: story.illustration,
                isPageSlug: story._type === 'frontpagePageLink',
                url: story._type === 'frontpageLink' ? story.url : story.page.slug ? `/${story.page.slug.current}` : '',
            };
        }),
    };
};
