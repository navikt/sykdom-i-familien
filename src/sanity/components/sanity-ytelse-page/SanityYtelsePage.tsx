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
import PageWithMenu from '../../../components/pages/page-with-menu/PageWithMenu';
import LinkButton from '../../../components/elements/link-button/LinkButton';
import traverse from 'traverse';
import PrintOnly from '../../../components/elements/print-only/PrintOnly';
import SanityBlock from '../sanity-block/SanityBlock';
import PagePoster from '../../../components/pages/frontpage/components/page-banner/PageBanner';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import { IllustrationDocument, YtelsePageDocument } from '../../types/documents';

export interface YtelsePageData {
    title: string;
    inShort: string;
    inShortTitle: string;
    formUrl: string;
    sections: SectionContent[];
    illustration: IllustrationDocument;
    banner?: IllustrationDocument;
}

interface SectionContent {
    _key: string;
    slug: string;
    title?: string;
    illustration: IllustrationDocument;
    content?: string;
}

interface Props {
    data: YtelsePageDocument;
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
        banner: data._rawBanner,
        inShort: getSanityContentWithLocale(data._rawInShort, locale) as string,
        inShortTitle: getSanityStringWithLocale(data._rawInShortTitle, locale) as string,
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
    const { title, inShort, inShortTitle, sections, banner, illustration, formUrl } = extractDataFromSanityYtelsePage(
        data,
        intl.locale
    );

    const inShortSection: SectionContent = {
        _key: 'inShortSection',
        title: inShortTitle,
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
            header={
                banner ? (
                    <PagePoster
                        wide={true}
                        title={title}
                        illustration={<SanityIllustration illustration={banner} maintainAspectRatio={true} />}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia iure quidem, deserunt laborum,
                        odit enim porro
                    </PagePoster>
                ) : (
                    undefined
                )
            }
            menuFooter={<LinkButton href={formUrl}>Søk nå</LinkButton>}>
            <div style={{ marginTop: '-4rem' }}>
                <PanelWithTitleAndIllustration
                    titleTag="h1"
                    id={inShortSection.slug}
                    title={inShortSection.title}
                    illustration={
                        illustration ? (
                            <Box textAlignCenter={true} margin="none">
                                <CircleIllustration illustration={illustration} backgroundColor={styles.colors.theme} />
                            </Box>
                        ) : (
                            undefined
                        )
                    }
                    illustrationPlacement="outside">
                    {inShort && (
                        <Ingress className="inShortList" tag="div">
                            <SanityBlock content={inShort} />
                        </Ingress>
                    )}
                </PanelWithTitleAndIllustration>
            </div>
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
