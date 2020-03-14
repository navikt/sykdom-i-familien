import React from 'react';
import { RouterProps } from '@reach/router';
import { graphql } from 'gatsby';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import Box from '../components/layout/box/Box';
import FrontpagePanelWrapper from '../components/pages/frontpage/components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import LinkPanel from '../components/pages/frontpage/components/link-panel/LinkPanel';
import PageBanner from '../components/pages/frontpage/components/page-banner/PageBanner';
import Frontpage from '../components/pages/frontpage/Frontpage';
import SanityBlock from '../sanity/components/sanity-block/SanityBlock';
import SanityIllustration from '../sanity/components/sanity-illustration/SanityIllustrationContent';
import SanityMessage from '../sanity/components/sanity-message/SanityMessage';
import { IllustrationDocument, MessageDocument } from '../sanity/types/documents';
import { getSanityStringWithLocale } from '../utils/sanity/getSanityContentWithLocale';

interface Props {
    data: any;
}

const extractFrontpageData = (data: any, locale: string): FrontpageSanityData => {
    const {
        showLanguageToggle,
        _rawIllustration,
        _rawIngress,
        _rawTitle,
        _rawMessage,
        _rawFrontpageStories,
        _rawMetadescription
    } = data.allSanityFrontpage.nodes[0];

    return {
        showLanguageToggle: showLanguageToggle === true,
        title: getSanityStringWithLocale(_rawTitle, locale),
        ingress: getSanityStringWithLocale(_rawIngress, locale),
        metadescription: getSanityStringWithLocale(_rawMetadescription, locale),
        illustration: _rawIllustration,
        message: _rawMessage,
        stories: _rawFrontpageStories.map((story: any) => {
            return {
                title: getSanityStringWithLocale(
                    story._type === 'frontpageLink' ? story.title : story.page.title,
                    locale
                ),
                description: getSanityStringWithLocale(story.content, locale),
                illustration: story.illustration,
                isPageSlug: story._type === 'frontpagePageLink',
                url: story._type === 'frontpageLink' ? story.url : story.page.slug ? `/${story.page.slug.current}` : ''
            };
        })
    };
};

export interface FrontpageSanityData {
    showLanguageToggle: boolean;
    title: string;
    metadescription: string;
    ingress?: string;
    illustration: IllustrationDocument;
    stories?: FrontpageStory[];
    message?: MessageDocument;
}

interface FrontpageStory {
    title?: string;
    description?: string;
    illustration: IllustrationDocument;
    url: string;
    isPageSlug: boolean;
}

const Hovedside: React.FunctionComponent<Props> = ({ data, intl }: Props & InjectedIntlProps & RouterProps) => {
    const {
        showLanguageToggle,
        title,
        metadescription,
        ingress,
        message,
        illustration,
        stories: linkPanels
    } = extractFrontpageData(data, intl.locale);

    return (
        <Frontpage
            showLanguageToggle={showLanguageToggle}
            pageTitle={title}
            pageMetaDescription={metadescription}
            header={
                title && ingress ? (
                    <PageBanner
                        title={title}
                        illustration={<SanityIllustration illustration={illustration} maintainAspectRatio={true} />}>
                        <SanityBlock content={ingress} />
                    </PageBanner>
                ) : (
                    undefined
                )
            }>
            {message && (
                <Box padBottom="xl" margin="l">
                    <SanityMessage message={message} />
                </Box>
            )}

            <Box>
                <FrontpagePanelWrapper>
                    {linkPanels &&
                        linkPanels.map((story, index) => (
                            <LinkPanel
                                key={index}
                                title={story.title || ''}
                                url={{ url: story.url, isPageSlug: story.isPageSlug }}
                                image={
                                    story.illustration ? (
                                        <SanityIllustration illustration={story.illustration} />
                                    ) : (
                                        undefined
                                    )
                                }>
                                {story.description && <SanityBlock content={story.description} />}
                            </LinkPanel>
                        ))}
                </FrontpagePanelWrapper>
            </Box>
        </Frontpage>
    );
};

export const pageQuery = graphql`
    {
        allSanityFrontpage {
            nodes {
                showLanguageToggle
                _id
                _rawMetadescription
                _rawTitle
                _rawIngress
                _rawMessage(resolveReferences: { maxDepth: 4 })
                _rawIllustration(resolveReferences: { maxDepth: 4 })
                _rawFrontpageStories(resolveReferences: { maxDepth: 4 })
            }
        }
    }
`;

export default injectIntl(Hovedside);
