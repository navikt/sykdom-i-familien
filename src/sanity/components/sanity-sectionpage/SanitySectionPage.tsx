import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import slugify from 'slugify';
import PrintOnly from '../../../components/elements/print-only/PrintOnly';
import Box from '../../../components/layout/box/Box';
import { SectionMenuItem } from '../../../components/pages/custom-page/CustomPage';
import PageBannerCompact from '../../../components/pages/frontpage/components/page-banner_compact/PageBannerCompact';
import PageWithMenu from '../../../components/pages/page-with-menu/PageWithMenu';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import { getLocaleToUse, Locale } from '../../../i18n/locale';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale,
} from '../../../utils/sanity/getSanityContentWithLocale';
import { Site } from '../../../utils/site';
import { IllustrationDocument, SectionPageDocument } from '../../types/documents';
import { createAnchorsForTabsWithinSections, getAndApplyLinksInContent } from '../../utils/prepLinksInDocument';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import InShortPageSection from './InShortPageSection';
import PageSection from './PageSection';
import './sectionPage.less';

export interface SectionPageData {
    site: Site;
    showLanguageToggle: boolean;
    title: string;
    slug: { current: string };
    metadescription: string;
    content: any[];
    inShort?: {
        title?: string;
        content: string;
        illustration?: IllustrationDocument;
    };
    inShortEkstraKomponenter: string[];
    showLeftMenu?: boolean;
}

export interface SanitySectionPageSectionContent {
    _id: string;
    _key: string;
    slug: string;
    title?: string;
    illustration?: IllustrationDocument;
    content?: string;
}

interface Props {
    data: SectionPageDocument;
}

const extractSectionData = (section: any, locale: string): SanitySectionPageSectionContent => {
    const title = getSanityStringWithLocale(section.title, locale);
    return {
        _id: section._id,
        _key: section._key,
        slug: slugify(title || ''),
        title,
        illustration: section.illustration,
        content: section.content,
    };
};

export const extractDataFromSanitySectionPage = (data: any, locale: Locale | string): SectionPageData => {
    const showLanguageToggle = data.showLanguageToggle === true;
    const localeToUse = getLocaleToUse(showLanguageToggle, locale);
    return {
        site: data.site,
        showLanguageToggle,
        title: getSanityStringWithLocale(data._rawTitle, localeToUse) as string,
        slug: data.slug,
        metadescription: getSanityContentWithLocale(data._rawMetadescription, localeToUse) as string,
        content: data._rawContent,
        inShort: data._rawInShort
            ? {
                  title: data._rawInShortTitle
                      ? (getSanityStringWithLocale(data._rawInShortTitle, localeToUse) as string)
                      : undefined,
                  content: getSanityContentWithLocale(data._rawInShort, localeToUse) as string,
                  illustration: data._rawInShortIllustration,
              }
            : undefined,
        inShortEkstraKomponenter: data._rawInShortEkstraKomponenter as string[],
        showLeftMenu: data.showLeftMenu === true || data.showLeftMenu === null,
    };
};

const SanitySectionPage: React.FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { data, links: linksInContent } = getAndApplyLinksInContent(props.data);
    const dataWithTabs = createAnchorsForTabsWithinSections(data, intl.locale);

    const {
        site,
        title,
        metadescription,
        showLanguageToggle,
        inShort,
        slug,
        content,
        inShortEkstraKomponenter,
        showLeftMenu,
    } = extractDataFromSanitySectionPage(dataWithTabs, intl.locale);

    const inShortSection: SanitySectionPageSectionContent | undefined = inShort
        ? {
              _id: 'inShortSection',
              _key: 'inShortSection',
              title: inShort.title,
              illustration: inShort.illustration,
              content: inShort.content,
              slug: slugify(inShort.title || ''),
          }
        : undefined;

    const contentSections = [...content.filter((c) => c._type === 'section')];
    const sectionMenuItems: SectionMenuItem[] = showLeftMenu
        ? contentSections.map((sectionRaw) => {
              const section = extractSectionData(sectionRaw, intl.locale);
              return {
                  label: section.title || '',
                  slug: section.slug,
              };
          })
        : [];

    if (inShortSection) {
        sectionMenuItems.unshift({
            label: inShortSection.title || '',
            slug: inShortSection.slug,
        });
    }

    return (
        <PageWithMenu
            site={site}
            pageTitle={title}
            showLanguageToggle={showLanguageToggle}
            pageMetadescription={metadescription}
            slug={`${slug.current}`}
            sectionMenuItems={sectionMenuItems}
            menuFooter={<Box />}
            header={<PageBannerCompact title={title} />}>
            {inShortSection && (
                <Box margin="none" className="sectionPageContentWrapper">
                    <InShortPageSection
                        section={inShortSection}
                        site={site}
                        inShortEkstraKomponenter={inShortEkstraKomponenter}
                    />
                </Box>
            )}
            {(content || []).map((c) => {
                const key = c._id || c._key;
                if (c._type === 'section') {
                    const section = extractSectionData(c, intl.locale);
                    return (
                        <Box margin="none" key={key} className="sectionPageContentWrapper">
                            <PageSection section={section} />
                        </Box>
                    );
                }
                return (
                    <Box margin="none" key={key} className="sectionPageContentWrapper">
                        <SanityBlockContent content={c} headingLevel={2} site={site} />
                    </Box>
                );
            })}
            <PrintOnly>
                <SectionPanel title="Lenker i dokumentet">
                    <ol start={1}>
                        {linksInContent.map((link) => {
                            return link ? (
                                <li key={link._key}>
                                    <p style={{ wordBreak: 'break-all' }}>{link!.url}</p>
                                </li>
                            ) : null;
                        })}
                    </ol>
                </SectionPanel>
            </PrintOnly>
        </PageWithMenu>
    );
};

export default injectIntl(SanitySectionPage);
