import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import slugify from 'slugify';
import traverse from 'traverse';
import PrintOnly from '../../../components/elements/print-only/PrintOnly';
import Box from '../../../components/layout/box/Box';
import PageBannerCompact from '../../../components/pages/frontpage/components/page-banner_compact/PageBannerCompact';
import PageWithMenu from '../../../components/pages/page-with-menu/PageWithMenu';
import SectionIcon from '../../../components/sectionPanel/SectionIcon';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import { Locale } from '../../../i18n/locale';
import {
    getSanityContentWithLocale, getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import { IllustrationDocument, SectionPageDocument } from '../../types/documents';
import {
    createAnchorsForTabsWithinSections, getAndApplyLinksInContent
} from '../../utils/prepLinksInDocument';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import './sectionPage.less';

export interface SectionPageData {
    showLanguageToggle: boolean;
    title: string;
    slug: { current: string };
    metadescription: string;
    content: any[];
}

interface SectionContent {
    _id: string;
    _key: string;
    slug: string;
    title?: string;
    illustration: IllustrationDocument;
    content?: string;
}

interface Props {
    data: SectionPageDocument;
}

const extractSectionData = (section: any, locale: string): SectionContent => {
    const title = getSanityStringWithLocale(section.title, locale);
    return {
        _id: section._id,
        _key: section._key,
        slug: slugify(title || ''),
        title,
        illustration: section.illustration,
        content: section.content
    };
};

export const extractDataFromSanitySectionPage = (data: any, locale: Locale | string): SectionPageData => {
    return {
        showLanguageToggle: data.showLanguageToggle === true,
        title: getSanityStringWithLocale(data._rawTitle, locale) as string,
        slug: data.slug,
        metadescription: getSanityContentWithLocale(data._rawMetadescription, locale) as string,
        content: data._rawContent
    };
};

const SanitySectionPage: React.FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { data, links: linksInContent } = getAndApplyLinksInContent(props.data);
    const dataWithTabs = createAnchorsForTabsWithinSections(data, intl.locale);

    const { title, metadescription, showLanguageToggle, slug, content } = extractDataFromSanitySectionPage(
        dataWithTabs,
        intl.locale
    );

    return (
        <PageWithMenu
            pageTitle={title}
            showLanguageToggle={showLanguageToggle}
            pageMetadescription={metadescription}
            slug={`${slug.current}`}
            sectionMenuItems={[...content.filter((c) => c._type === 'section')].map((sectionRaw) => {
                const section = extractSectionData(sectionRaw, intl.locale);
                return {
                    label: section.title || '',
                    slug: section.slug
                };
            })}
            menuFooter={<Box />}
            header={<PageBannerCompact title={title} />}>
            {content.map((c) => {
                const key = c._id || c._key;
                if (c._type === 'section') {
                    const section = extractSectionData(c, intl.locale);
                    return (
                        <Box margin="none" key={key} className="sectionPageContentWrapper">
                            <SectionPanel
                                key={key}
                                id={section.slug}
                                title={section.title}
                                illustration={
                                    section.illustration ? (
                                        <Box textAlignCenter={true} margin="none">
                                            <SectionIcon illustration={section.illustration} />
                                        </Box>
                                    ) : (
                                        undefined
                                    )
                                }>
                                {section.content && <SanityBlockContent content={section.content} headingLevel={2} />}
                            </SectionPanel>
                        </Box>
                    );
                }

                return (
                    <Box margin="none" key={key} className="sectionPageContentWrapper">
                        <SanityBlockContent content={c} headingLevel={2} />
                    </Box>
                );
            })}
            <PrintOnly>
                <SectionPanel title="Lenker i dokumentet">
                    <ol start={1}>
                        {linksInContent.map((link) => (
                            <li key={link!._key}>
                                <p style={{ wordBreak: 'break-all' }}>{link!.url}</p>
                            </li>
                        ))}
                    </ol>
                </SectionPanel>
            </PrintOnly>
        </PageWithMenu>
    );
};

export default injectIntl(SanitySectionPage);
