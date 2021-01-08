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
import { Site } from '../../../utils/site';
import { fontsize } from '../../../../__mocks__/file-mock';

export interface CustomPageData {
    site: Site;
    showLanguageToggle: boolean;
    title: string;
    slug: { current: string };
    intro: string;
    metadescription: string;
    ingress: any;
    content: string;
    illustration?: IllustrationDocument;
}

interface Props {
    data: YtelsePageDocument;
}

export const extractDataFromSanityCustomPage = (data: any, locale: Locale | string): CustomPageData => {
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
