import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import slugify from 'slugify';
import { Ingress } from 'nav-frontend-typografi';
import LinkButton from '../../../components/elements/link-button/LinkButton';
import PrintOnly from '../../../components/elements/print-only/PrintOnly';
import Box from '../../../components/layout/box/Box';
import PageBannerCompact from '../../../components/pages/frontpage/components/page-banner_compact/PageBannerCompact';
import PageWithMenu from '../../../components/pages/page-with-menu/PageWithMenu';
import SectionIcon from '../../../components/sectionPanel/SectionIcon';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import { Locale } from '../../../i18n/locale';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale,
} from '../../../utils/sanity/getSanityContentWithLocale';
import { IllustrationDocument, MessageDocument, YtelsePageDocument } from '../../types/documents';
import { createAnchorsForTabsWithinSections, getAndApplyLinksInContent } from '../../utils/prepLinksInDocument';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import SanityBlock from '../sanity-block/SanityBlock';
import SanityMessage from '../sanity-message/SanityMessage';
import './ytelsePage.less';

export interface YtelsePageData {
    showLanguageToggle: boolean;
    title: string;
    slug: { current: string };
    intro: string;
    inShort: string;
    inShortEkstraKomponenter: string[];
    metadescription: string;
    inShortTitle: string;
    formUrl: string;
    sections: SectionContent[];
    illustration: IllustrationDocument;
    message?: MessageDocument;
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
}

const extractSectionData = (data: any[], locale: Locale): SectionContent[] => {
    if (!data) {
        return [];
    }
    return data.map((section) => {
        const title = getSanityStringWithLocale(section.title, locale);
        return {
            _key: section._key,
            slug: section.slug?.current || slugify(title || ''),
            title,
            formUrl: section.formUrl,
            illustration: section.illustration,
            content: section.content,
        };
    });
};

const extractDataFromSanityYtelsePage = (data: any, locale: Locale | string): YtelsePageData => {
    return {
        showLanguageToggle: data.showLanguageToggle === true,
        title: getSanityStringWithLocale(data._rawTitle, locale) as string,
        intro: getSanityContentWithLocale(data._rawIntro, locale) as string,
        slug: data.slug,
        metadescription: getSanityContentWithLocale(data._rawMetadescription, locale) as string,
        inShort: getSanityContentWithLocale(data._rawInShort, locale) as string,
        inShortEkstraKomponenter: data._rawInShortEkstraKomponenter as string[],
        inShortTitle: getSanityStringWithLocale(data._rawInShortTitle, locale) as string,
        formUrl: data.ytelse.formUrl,
        sections: extractSectionData(data._rawContent, locale as Locale),
        illustration: data._rawIllustration,
        message: data._rawMessage,
    };
};

const SanityYtelsePage: React.FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { data, links: linksInContent } = getAndApplyLinksInContent(props.data);
    const dataWithTabs = createAnchorsForTabsWithinSections(data, intl.locale);
    const {
        title,
        metadescription,
        showLanguageToggle,
        slug,
        inShort,
        inShortTitle,
        inShortEkstraKomponenter,
        sections,
        illustration,
        formUrl,
        message,
    } = extractDataFromSanityYtelsePage(dataWithTabs, intl.locale);

    const inShortSection: SectionContent = {
        _key: 'inShortSection',
        title: inShortTitle,
        content: inShort,
        illustration,
        slug: slugify(title || ''),
    };

    return (
        <PageWithMenu
            pageTitle={title}
            showLanguageToggle={showLanguageToggle}
            pageMetadescription={metadescription}
            slug={`${slug.current}`}
            sectionMenuItems={[inShortSection, ...sections].map((section) => ({
                label: section.title || '',
                slug: section.slug,
            }))}
            header={<PageBannerCompact title={title} />}
            menuFooter={
                <LinkButton href={formUrl} alignCenter={true}>
                    Søk nå
                </LinkButton>
            }>
            {message && (
                <div style={{ marginBottom: '4rem' }}>
                    <SanityMessage message={message} />
                </div>
            )}
            <div className="inShortSection">
                <SectionPanel
                    titleTag="h2"
                    id={inShortSection.slug}
                    title={inShortSection.title}
                    illustration={
                        illustration ? (
                            <Box textAlignCenter={true} margin="none">
                                <SectionIcon illustration={illustration} />
                            </Box>
                        ) : undefined
                    }
                    illustrationPlacement="outside">
                    {inShort && (
                        <Ingress className="inShortList formattedRichContent" tag="div">
                            <SanityBlock content={inShort} />
                        </Ingress>
                    )}
                    {(inShortEkstraKomponenter || []).map((infopanel: string, infopanelIndex) => {
                        return <SanityBlockContent content={infopanel} headingLevel={3} key={infopanelIndex} />;
                    })}
                </SectionPanel>
            </div>
            {sections.map((section) => (
                <SectionPanel
                    key={section._key}
                    id={section.slug}
                    title={section.title}
                    illustration={
                        section.illustration ? (
                            <Box textAlignCenter={true} margin="none">
                                <SectionIcon illustration={section.illustration} />
                            </Box>
                        ) : undefined
                    }>
                    {section.content && <SanityBlockContent content={section.content} headingLevel={2} />}
                </SectionPanel>
            ))}
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

export default injectIntl(SanityYtelsePage);
