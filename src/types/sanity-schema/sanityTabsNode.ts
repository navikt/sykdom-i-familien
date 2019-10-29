import { SanityContentBlockNode } from './sanityContentBlockNode';
import { SanityLocaleStringNode } from './sanityLocaleStringNode';
import { SanityIllustrationNode } from './sanityIllustrationNode';

export interface SanityTabContentNode {
    title: SanityLocaleStringNode;
    content: SanityContentBlockNode;
    tabIllustration?: SanityIllustrationNode;
}

export interface SanityTabsNode {
    name: string;
    content: SanityTabContentNode[];
}
