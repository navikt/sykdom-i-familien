import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import { Ingress } from 'nav-frontend-typografi';
import CoronaWarning from '../../../components/corona-warning/CoronaWarning';
import CustomPage from '../../../components/pages/custom-page/CustomPage';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import { Locale } from '../../../i18n/locale';
import {
    getSanityContentWithLocale, getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import { YtelsePageDocument } from '../../types/documents';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import SanityBlock from '../sanity-block/SanityBlock';
import SanityTextblock from '../sanity-textblock/SanityTextblock';

export interface CustomPageData {
    showLanguageToggle: boolean;
    title: string;
    slug: { current: string };
    intro: string;
    metadescription: string;
    ingress: any;
    content: string;
}

interface Props {
    data: YtelsePageDocument;
}

export const extractDataFromSanityCustomPage = (data: any, locale: Locale | string): CustomPageData => {
    return {
        showLanguageToggle: data.showLanguageToggle === true,
        title: getSanityStringWithLocale(data._rawTitle, locale) as string,
        intro: getSanityContentWithLocale(data._rawIntro, locale) as string,
        slug: data.slug,
        metadescription: getSanityContentWithLocale(data._rawMetadescription, locale) as string,
        ingress: getSanityContentWithLocale(data._rawIngress, locale) as string,
        content: data._rawContent
    };
};

const SanityYtelsePage: React.FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { data } = props;
    const { title, metadescription, showLanguageToggle, content, ingress, slug } = extractDataFromSanityCustomPage(
        data,
        intl.locale
    );

    return (
        <CustomPage
            intl={intl}
            pageTitle={title}
            showLanguageToggle={showLanguageToggle}
            pageMetadescription={metadescription}
            slug={`${slug.current}`}>
            <SectionPanel title={title}>
                {ingress && (
                    <Ingress tag="div" style={{ marginBottom: '2rem' }}>
                        <SanityBlock content={ingress} />
                    </Ingress>
                )}
                <SanityBlockContent content={content} headingLevel={2} />
            </SectionPanel>
        </CustomPage>
    );
};

export default injectIntl(SanityYtelsePage);
