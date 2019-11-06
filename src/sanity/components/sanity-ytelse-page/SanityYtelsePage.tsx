import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale, defaultLocale } from '../../../i18n/locale';
import Box from '../../../components/layout/box/Box';
import PanelWithTitleAndIllustration from '../../../components/panel-with-title-and-illustration/PanelWithTitleAndIllustration';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import CircleIllustration from '../../../components/elements/circle-illustration/CircleIllustration';
import styles from '../../../styles';
import { Ingress } from 'nav-frontend-typografi';
import { WindowLocation } from '@reach/router';
import slugify from 'slugify';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import { SanityIllustrationSchema } from '../../schema-types';
import PageWithMenu from '../../../components/pages/page-with-menu/PageWithMenu';
import LinkButton from '../../../components/elements/link-button/LinkButton';
import traverse from 'traverse';
import PrintOnly from '../../../components/elements/print-only/PrintOnly';
import SanityBlock from '../sanity-block/SanityBlock';

export interface YtelsePageData {
    title: string;
    inShort: string;
    formUrl: string;
    sections: SectionContent[];
    illustration: SanityIllustrationSchema;
}

interface SectionContent {
    _key: string;
    slug: string;
    title?: string;
    illustration: SanityIllustrationSchema;
    content?: string;
}

interface Props {
    data: any;
    location: WindowLocation;
}

export const extractSectionData = (data: any[]): SectionContent[] => {
    if (!data) {
        return [];
    }
    return data.map((section) => {
        const title = getSanityStringWithLocale(section.title, defaultLocale);
        return {
            _key: section._key,
            slug: slugify(title || ''),
            title,
            formUrl: section.formUrl,
            illustration: section.illustration,
            content: section.content
        };
    });
};

export const extractDataFromSanityYtelsePage = (data: any, locale: Locale | string): YtelsePageData => {
    return {
        title: getSanityStringWithLocale(data._rawTitle, locale) as string,
        inShort: getSanityContentWithLocale(data._rawInShort, locale) as string,
        formUrl: data.ytelse.formUrl,
        sections: extractSectionData(data._rawContent),
        illustration: data._rawIllustration
    };
};

const getAndApplyLinksInContent = (data: any) => {
    const links: any[] = [];
    const blocksWithMarks: any[] = [];
    let linkCounter = 1;

    const dataWithLinkNumbers = traverse(data).map((node) => {
        if (node && typeof node === 'object') {
            if (node._type === 'link') {
                const modifiedNode = { ...node, linkNumber: linkCounter };
                links.push({ ...node, linkNumber: linkCounter++ });
                return modifiedNode;
            } else if (node.marks) {
                blocksWithMarks.push(node);
            }
        }
        return node;
    });
    return {
        data: dataWithLinkNumbers,
        links: links.map((link) => {
            const node = blocksWithMarks.find((block) => block.marks.find((m: any) => m === link._key));
            return !node
                ? undefined
                : {
                      url: link.href,
                      _key: link._key,
                      text: node.text,
                      linkNumber: link.linkNumber
                  };
        })
    };
};

export const extractLinksFromContent = {};

const SanityYtelsePage: React.FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { location, intl } = props;
    const { data, links: linksInContent } = getAndApplyLinksInContent(props.data);
    const { title, inShort, sections, illustration, formUrl } = extractDataFromSanityYtelsePage(data, intl.locale);
    const inShortSection: SectionContent = {
        _key: 'inShortSection',
        title,
        content: inShort,
        illustration,
        slug: slugify(title || '')
    };

    return (
        <PageWithMenu
            pageTitle={title}
            location={location}
            sectionMenuItems={[inShortSection, ...sections].map((section) => ({
                label: section.title || '',
                slug: section.slug
            }))}
            menuFooter={<LinkButton href={formUrl}>Søk nå</LinkButton>}>
            <PanelWithTitleAndIllustration
                titleTag="h1"
                id={inShortSection.slug}
                title={title}
                illustration={
                    illustration ? (
                        <Box textAlignCenter={true} margin="none">
                            <CircleIllustration illustration={illustration} backgroundColor={styles.colors.theme} />
                        </Box>
                    ) : (
                        undefined
                    )
                }>
                {inShort && (
                    <Ingress className="inShortList" tag="div">
                        <SanityBlock content={inShort} />
                    </Ingress>
                )}
            </PanelWithTitleAndIllustration>
            {sections.map((section) => (
                <PanelWithTitleAndIllustration
                    key={section._key}
                    id={section.slug}
                    title={section.title}
                    illustration={
                        section.illustration ? (
                            <Box textAlignCenter={true} margin="none">
                                <CircleIllustration
                                    illustration={section.illustration}
                                    backgroundColor={styles.colors.theme}
                                />
                            </Box>
                        ) : (
                            undefined
                        )
                    }>
                    {section.content && <SanityBlockContent content={section.content} />}
                </PanelWithTitleAndIllustration>
            ))}
            <PrintOnly>
                <PanelWithTitleAndIllustration title="Lenker i dokumentet">
                    <ol start={1}>
                        {linksInContent.map((link) => (
                            <li key={link!._key}>
                                <p style={{ wordBreak: 'break-all' }}>{link!.url}</p>
                            </li>
                        ))}
                    </ol>
                </PanelWithTitleAndIllustration>
            </PrintOnly>
        </PageWithMenu>
    );
};

export default injectIntl(SanityYtelsePage);
