import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import BlockContent from '@sanity/block-content-to-react';
import { Locale, defaultLocale } from '../../../i18n/locale';
import Box from '../../../components/layout/box/Box';
import PanelWithTitleAndIllustration from '../../../components/panel-with-title-and-illustration/PanelWithTitleAndIllustration';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import CircleIllustration from '../../../components/elements/circle-illustration/CircleIllustration';
import styles from '../../../styles';
import { Ingress } from 'nav-frontend-typografi';
import { WindowLocation } from '@reach/router';
import slugify from 'slugify';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import { SanityIllustrationSchema } from '../../schema-types';
import PageWithMenu from '../../../components/pages/page-with-menu/PageWithMenu';
import LinkButton from '../../../components/elements/link-button/LinkButton';

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
    title: string;
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
        const title = getSanityContentWithLocale(section.title, defaultLocale);
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
        title: getSanityContentWithLocale(data._rawTitle, locale),
        inShort: getSanityContentWithLocale(data._rawInShort, locale),
        formUrl: data.ytelse.formUrl,
        sections: extractSectionData(data._rawContent),
        illustration: data._rawIllustration
    };
};

const SanityYtelsePage: React.FunctionComponent<Props> = ({ data, location, intl }: Props & InjectedIntlProps) => {
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
            title={title}
            location={location}
            sectionMenuItems={[inShortSection, ...sections].map((section) => ({
                label: section.title,
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
                        <BlockContent blocks={inShort} />
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
        </PageWithMenu>
    );
};

export default injectIntl(SanityYtelsePage);
