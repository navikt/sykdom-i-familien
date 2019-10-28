import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import BlockContent from '@sanity/block-content-to-react';
import { Locale } from '../../../types/locale';
import Box from '../../box/Box';
import PanelWithTitleAndIllustration from '../../panel-with-title-and-illustration/PanelWithTitleAndIllustration';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { SanityIllustrationNode } from '../../../types/sanity-schema/sanityIllustrationNode';
import CircleIllustration from '../../circle-illustration/CircleIllustration';
import styles from '../../../styles';
import { Ingress } from 'nav-frontend-typografi';
import { WindowLocation } from '@reach/router';
import Page from '../../page/Page';
import StickyMenu from '../../sticky-menu/StickyMenu';
import slugify from 'slugify';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';

export interface YtelsePageData {
    title: string;
    inShort: string;
    sections: SectionContent[];
    illustration: SanityIllustrationNode;
}

interface SectionContent {
    _key: string;
    slug: string;
    title: string;
    illustration: SanityIllustrationNode;
    content?: string;
}

interface Props {
    data: any;
    location: WindowLocation;
}

export const extractSectionData = (data: any[]): SectionContent[] => {
    return data.map((section) => {
        const title = getSanityContentWithLocale(section.title, 'nb');
        return {
            _key: section._key,
            slug: slugify(title),
            title,
            illustration: section.illustration,
            content: section.content
        };
    });
};

export const extractDataFromSanityYtelsePage = (data: any, locale: Locale | string): YtelsePageData => {
    return {
        title: getSanityContentWithLocale(data._rawTitle, locale),
        inShort: getSanityContentWithLocale(data._rawInShort, locale),
        sections: extractSectionData(data._rawContent),
        illustration: data._rawIllustration
    };
};

const YtelsePage: React.FunctionComponent<Props> = ({ data, location, intl }: Props & InjectedIntlProps) => {
    const { title, inShort, sections, illustration } = extractDataFromSanityYtelsePage(data, intl.locale);
    return (
        <Page
            location={location}
            menu={
                <StickyMenu>
                    {sections.map((s) => (
                        <p key={s._key}>
                            <a href={`#${s.slug}`}>{s.title}</a>
                        </p>
                    ))}
                </StickyMenu>
            }>
            <Box padBottom="xl">
                <PanelWithTitleAndIllustration
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
                    <Ingress className="inShortList" tag="div">
                        <BlockContent blocks={inShort} />
                    </Ingress>
                </PanelWithTitleAndIllustration>
            </Box>
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
        </Page>
    );
};

export default injectIntl(YtelsePage);
