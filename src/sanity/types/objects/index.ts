import { LocaleStringType, LocaleRichTextType } from '../locale-objects/index';
import { IllustrationType, YtelsePageType } from '../documents/index';

export type GroupedContentPresentation = 'tabs' | 'dropdown';
export type TitleAndTextLayout = 'normal' | 'expandablePanel';

export type BlockContentChildrenTypes =
    | TitleAndTextType
    | ExpandableContentType
    | IllustrationType
    | GroupedContentType
    | VeilederpanelType;

export interface BlockContentType {
    title: LocaleStringType;
    content: BlockContentChildrenTypes[];
}

export interface ExpandableContentType {
    title: LocaleStringType;
    content: LocaleRichTextType;
}

export interface FrontpageLinkType {
    title: LocaleStringType;
    content: LocaleRichTextType;
    illustration: IllustrationType;
    url: string;
}

export interface FrontpagePageLinkType {
    page: YtelsePageType;
    content: LocaleRichTextType;
    illustration: IllustrationType;
    url: string;
}

export interface GroupedContentType {
    title: LocaleStringType;
    presentation: GroupedContentPresentation;
    content: TitleAndBlockContentType;
}

export interface LinkType {
    text: LocaleStringType;
    url: string;
}

export interface SectionType {
    title: LocaleStringType;
    illustration: IllustrationType;
    content: BlockContentChildrenTypes[];
}

export interface TitleAndBlockContentType {
    illustration: IllustrationType;
    content: BlockContentChildrenTypes[];
}

export interface TitleAndTextType {
    layout: TitleAndTextLayout;
    title: LocaleStringType;
    content: LocaleRichTextType;
}

export type VeilederpanelFaceValg = 'glad' | 'undrende' | 'skeptisk';
export type VeilederpanelColorValg = 'normal' | 'suksess' | 'advarsel' | 'feilmelding';
export type VeilederpanelVisningValg = 'vanlig' | 'plakat';
export type VeilederpanelKompaktValg = 'vanlig' | 'plakat';

export interface VeilederpanelType {
    face: VeilederpanelFaceValg;
    color: VeilederpanelColorValg;
    type: VeilederpanelVisningValg;
    kompakt: VeilederpanelKompaktValg;
    content: LocaleRichTextType;
}
