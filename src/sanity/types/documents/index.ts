import { LocaleStringType, LocaleRichTextType } from '../locale-objects';
import { FrontpageLinkType, FrontpagePageLinkType, SectionType, LinkType } from '../objects';

export interface FrontpageType {
    title: LocaleStringType;
    ingress: LocaleRichTextType;
    illustration: IllustrationType;
    frontpageStories: Array<FrontpageLinkType | FrontpagePageLinkType>;
    related: LinkType[];
}

export interface IllustrationType {
    name: string;
    svg: string;
}

export interface YtelseType {
    name: string;
    key: string;
    formUrl: string;
}

export interface YtelsePageType {
    ytelse: YtelseType;
    slug: string;
    banner: IllustrationType;
    title: LocaleStringType;
    illustration: IllustrationType;
    inShort: LocaleRichTextType;
    content: SectionType[];
}
