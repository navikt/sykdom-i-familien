interface LocaleType {
    nb: string;
    nn: string;
}

type BlockContent = string | string[];

export type SanityLocaleStringSchema = LocaleType;
export type SanityLocaleTextSchema = LocaleType;
export type SanityLocaleBlockSchema = LocaleType;

export interface SanityTitleAndContentBlockSchema {
    title: SanityLocaleStringSchema;
    content: BlockContent;
}

export type SanityInternalCommonSchema = SanityTitleAndContentBlockSchema;

export interface SanityIllustrationSchema {
    title: string;
    description: string;
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
    content: SanityLocaleBlockSchema;
}
