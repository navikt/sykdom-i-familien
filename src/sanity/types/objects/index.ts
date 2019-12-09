import { LocaleStringObject, LocaleRichTextObject } from '../locale-objects/index';
import { IllustrationDocument, YtelsePageDocument } from '../documents/index';

export type BlockContentObjectTypes =
    | ExpandableContentObject
    | IllustrationDocument
    | TabsObject
    | TextblockObject
    | VeilederpanelObject;

export interface ExpandableContentObject {
    title: LocaleStringObject;
    content: LocaleRichTextObject;
}
export interface FrontpageLinkObject {
    title: LocaleStringObject;
    content: LocaleRichTextObject;
    illustration: IllustrationDocument;
    url: string;
}

export interface FrontpagePageLinkObject {
    page: YtelsePageDocument;
    content: LocaleRichTextObject;
    illustration: IllustrationDocument;
    url: string;
}

export type TabsObjectPresentation = 'tabs' | 'dropdown';

export interface TabsObject {
    title?: LocaleStringObject;
    presentation: TabsObjectPresentation;
    bgcolor?: string;
    content: TabObject[];
}

export interface TabObject {
    title: LocaleStringObject; // Tab-label
    tabIllustration: IllustrationDocument;
    contentTitle?: LocaleStringObject;
    content: BlockContentObjectTypes[];
}
export interface SectionObject {
    title: LocaleStringObject;
    illustration: IllustrationDocument;
    content: BlockContentObjectTypes[];
}

export type TextblockObjectLayout = 'normal' | 'expandablePanel' | 'ingress' | 'step';

export interface TextblockObject {
    title: LocaleStringObject;
    content: LocaleRichTextObject;
    layout: TextblockObjectLayout;
}

export type VeilederpanelVeiledertype = 'normal' | 'rasmus' | 'temafarge';
export type VeilederpanelFaceValg = 'glad' | 'undrende' | 'skeptisk';
export type VeilederpanelColorValg = 'normal' | 'suksess' | 'advarsel' | 'feilmelding';
export type VeilederpanelVisningValg = 'normal' | 'plakat';
export type VeilederpanelKompaktValg = 'normal' | 'kompakt';

export interface VeilederpanelObject {
    face: VeilederpanelFaceValg;
    color: VeilederpanelColorValg;
    type: VeilederpanelVisningValg;
    kompakt: VeilederpanelKompaktValg;
    content: LocaleRichTextObject;
    veiledertype: VeilederpanelVeiledertype;
}
