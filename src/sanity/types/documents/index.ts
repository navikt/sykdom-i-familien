import { LocaleRichTextObject, LocaleStringObject } from '../locale-objects';
import { FrontpageLinkObject, FrontpagePageLinkObject, SectionObject } from '../objects';

export interface FrontpageDocument {
    title: LocaleStringObject;
    ingress: LocaleRichTextObject;
    illustration: IllustrationDocument;
    frontpageStories: Array<FrontpageLinkObject | FrontpagePageLinkObject>;
}

export interface IllustrationDocument {
    name: string;
    svg: string;
    children: string[];
}

export interface AlertStripeObject {
    style: 'feil' | 'advarsel' | 'info';
    title: LocaleStringObject;
    content: LocaleRichTextObject;
}

export interface MessageDocument {
    style: 'feil' | 'advarsel' | 'info';
    title: LocaleStringObject;
    content: LocaleRichTextObject;
}

export interface OptimizedSvgNode {
    id: string;
    svg: string;
}

export interface YtelseDocument {
    name: string;
    key: string;
    formUrl: string;
    pdfFormUrl?: string;
}

export interface YtelsePageDocument {
    ytelse: YtelseDocument;
    slug: string;
    banner: IllustrationDocument;
    title: LocaleStringObject;
    illustration: IllustrationDocument;
    inShort: LocaleRichTextObject;
    inShortTitle: LocaleStringObject;
    content: SectionObject[];
}
export interface CustomPageDocument {
    slug: string;
    title: LocaleStringObject;
    content: SectionObject[];
}

export interface LinkDocument {
    text: LocaleStringObject;
    url: string;
}
