import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import { Ingress } from 'nav-frontend-typografi';
import Box from '../../../components/layout/box/Box';
import CustomPage from '../../../components/pages/custom-page/CustomPage';
import SectionIcon from '../../../components/sectionPanel/SectionIcon';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import { Locale } from '../../../i18n/locale';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale,
} from '../../../utils/sanity/getSanityContentWithLocale';
import { IllustrationDocument, YtelsePageDocument } from '../../types/documents';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import SanityBlock from '../sanity-block/SanityBlock';
import { getPageUrl, Site } from '../../../utils/site';
import BackLink from '../../../components/back-link/BackLink';

export interface CustomPageData {
    site: Site;
    showLanguageToggle: boolean;
    title: string;
    slug: { current: string };
    intro: string;
    metadescription: string;
    parentPage?: {
        slug: string;
        linkText?: string;
    };
    ingress: any;
    content: string;
    illustration?: IllustrationDocument;
}

interface Props {
    data: YtelsePageDocument;
}

export const extractDataFromSanityCustomPage = (data: any, locale: Locale | string): CustomPageData => {
    const parentPage = data._rawParentPagePage?.slug?.current
        ? {
              slug: data._rawParentPagePage.slug.current,
              linkText: data._rawParentPageLinkText
                  ? getSanityStringWithLocale(data._rawParentPageLinkText, locale)
                  : undefined,
          }
        : undefined;
    return {
        site: data.site,
        showLanguageToggle: data.showLanguageToggle === true,
        title: getSanityStringWithLocale(data._rawTitle, locale) as string,
        intro: getSanityContentWithLocale(data._rawIntro, locale) as string,
        slug: data.slug,
        metadescription: getSanityContentWithLocale(data._rawMetadescription, locale) as string,
        ingress: getSanityContentWithLocale(data._rawIngress, locale) as string,
        content: data._rawContent,
        illustration: data._rawIllustration,
        parentPage,
    };
};

const SanityYtelsePage: React.FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { data } = props;
    const {
        site,
        title,
        metadescription,
        illustration,
        showLanguageToggle,
        parentPage,
        content,
        ingress,
        slug,
    } = extractDataFromSanityCustomPage(data, intl.locale);

    return (
        <CustomPage
            site={site}
            intl={intl}
            pageTitle={title}
            showLanguageToggle={showLanguageToggle}
            pageMetadescription={metadescription}
            slug={`${slug.current}`}>
            {parentPage && (
                <BackLink href={getPageUrl(parentPage.slug, intl.locale, site)}>
                    {parentPage.linkText || 'Tilbake'}
                </BackLink>
            )}
            <SectionPanel
                title={title}
                illustrationPlacement="outside"
                illustration={
                    illustration ? (
                        <Box textAlignCenter={true} margin="none">
                            <SectionIcon illustration={illustration} />
                        </Box>
                    ) : undefined
                }
                titleStyle="plain">
                {ingress && (
                    <Ingress tag="div" style={{ marginBottom: '2rem', fontSize: '1rem' }}>
                        <SanityBlock content={ingress} />
                    </Ingress>
                )}
                <SanityBlockContent content={content} headingLevel={2} site={site} />
            </SectionPanel>
        </CustomPage>
    );
};

export default injectIntl(SanityYtelsePage);
