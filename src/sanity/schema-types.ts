interface LocaleString {
    nb: string;
    nn: string;
}
interface LocaleBlock {
    nb: BlockContent;
    nn: BlockContent;
}

type BlockContent = string | string[];

export type SanityLocaleStringSchema = LocaleString;
export type SanityLocaleTextSchema = LocaleString;
export type SanityLocaleBlockSchema = LocaleBlock;
export type SanityLocaleRichText = LocaleBlock;

export interface SanityTitleAndContentBlockSchema {
    title: SanityLocaleStringSchema;
    content: BlockContent;
}

export type SanityInternalCommonSchema = SanityTitleAndContentBlockSchema;

export interface SanityIllustrationSchema {
    title: string;
    description?: string;
    svg?: string;
}

export interface SanityGroupedContentSchema {
    title: SanityLocaleStringSchema;
    presentation: 'tabs' | 'dropdown';
    content: Array<{
        title: SanityLocaleStringSchema;
        content: SanityTitleAndContentBlockSchema;
        tabIllustration?: SanityIllustrationSchema;
    }>;
}

export interface SanityExpandableContentSchema {
    name: string;
    title: SanityLocaleStringSchema;
    content: BlockContent;
}

export interface FrontpageSanityContentSchema {
    _rawIllustration: {
        category: {
            id: string;
            name: string;
        };
        name: string;
        svg: string;
    };
    _rawTitle: SanityLocaleStringSchema;
    _rawIngress: SanityLocaleRichText;
    _rawFrontpageStories: FrontpageStorySchema[];
}

export interface SlugSchema {
    current: string;
}

interface FrontpageStoryBase {
    _type: string;
    content: LocaleBlock;
    illustration: SanityIllustrationSchema;
}
export interface FrontpageLinkSchema extends FrontpageStoryBase {
    _type: 'frontpageLink';
    title: LocaleString;
    url: string;
}

export interface FrontpagePageLinkSchema extends FrontpageStoryBase {
    _type: 'frontpagePageLink';
    page: {
        _id: string;
        title: LocaleString;
        slug: SlugSchema;
    };
}

export type FrontpageStorySchema = FrontpageLinkSchema | FrontpagePageLinkSchema;
