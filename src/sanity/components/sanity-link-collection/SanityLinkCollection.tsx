import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Box from '../../../components/layout/box/Box';
import LinkPanel from '../../../components/pages/frontpage/components/link-panel/LinkPanel';
import bemUtils from '../../../utils/bemUtils';
import { Site } from '../../../utils/site';
import { SanityContentHeadingLevel } from '../../types';
import { IllustrationDocument } from '../../types/documents';
import { getHeadingLevelForChild, getHeadingTag } from '../../utils';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import './linkCollection.less';

export interface LinkCollectionItem {
    title: string;
    description?: string;
    illustration: IllustrationDocument;
    url: string;
    isPageSlug: boolean;
}

interface Props {
    title?: string;
    ingress?: string | string[];
    links: LinkCollectionItem[];
    site?: Site;
    headingLevel: SanityContentHeadingLevel;
    isFrontPage?: boolean;
}

const bem = bemUtils('linkCollection');

const SanityLinkCollection = (props: Props) => {
    const { links, title, ingress, site, headingLevel } = props;
    const childHeadingLevel = getHeadingLevelForChild(headingLevel);
    return (
        <div className={bem.classNames(bem.block)}>
            {title && (
                <Ingress className={bem.element('title')} tag={getHeadingTag(childHeadingLevel)}>
                    {title}
                </Ingress>
            )}
            {ingress && (
                <Box margin="l" padBottom="l">
                    <SanityBlockContent headingLevel={childHeadingLevel} content={ingress} />
                </Box>
            )}
            {links.map((link, index) => (
                <LinkPanel
                    headingLevel={childHeadingLevel}
                    key={index}
                    title={link.title}
                    site={site}
                    url={{ url: link.url, isPageSlug: link.isPageSlug }}
                    image={link.illustration ? <SanityIllustration illustration={link.illustration} /> : undefined}>
                    {link.description && <p>{link.description}</p>}
                </LinkPanel>
            ))}
        </div>
    );
};

export default SanityLinkCollection;
