import { LocaleStringObject, LocaleRichTextObject } from '../locale-objects';
import { FrontpageLinkObject, FrontpagePageLinkObject, SectionObject } from '../objects';

export interface FrontpageDocument {
    title: LocaleStringObject;
    ingress: LocaleRichTextObject;
    illustration: IllustrationDocument;
    frontpageStories: Array<FrontpageLinkObject | FrontpagePageLinkObject>;
    related: LinkDocument[];
}

// export interface FrontpageGraphqlData {}

export interface IllustrationDocument {
    name: string;
    svg: string;
}

export interface YtelseDocument {
    name: string;
    key: string;
    formUrl: string;
}

export interface YtelsePageDocument {
    ytelse: YtelseDocument;
    slug: string;
    banner: IllustrationDocument;
    title: LocaleStringObject;
    illustration: IllustrationDocument;
    inShort: LocaleRichTextObject;
    content: SectionObject[];
}

export interface LinkDocument {
    text: LocaleStringObject;
    url: string;
}
