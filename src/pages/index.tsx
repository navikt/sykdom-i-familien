import React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';
import FrontpagePoster from '../components/pages/frontpage/components/frontpage-poster/FrontpagePoster';
import { InjectedIntlProps } from 'react-intl';
import FrontpagePanelWrapper from '../components/pages/frontpage/components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import { RouterProps } from '@reach/router';
import Frontpage from '../components/pages/frontpage/Frontpage';
import Box from '../components/layout/box/Box';
import LinkPanel from '../components/pages/frontpage/components/link-panel/LinkPanel';
import { graphql } from 'gatsby';
import { FrontpageSanityContentSchema, SanityIllustrationSchema } from '../sanity/schema-types';
import { getSanityContentWithLocale } from '../utils/sanity/getSanityContentWithLocale';
import SanityBlockContent from '../sanity/components/sanity-block-content/SanityBlockContent';
import SanityIllustration from '../sanity/components/sanity-illustration/SanityIllustrationContent';

interface Props {
    data: any;
}

// const Veiviser = require('../assets/veiviser.svg');

const extractFrontpageData = (data: FrontpageSanityContentSchema, locale: string): FrontpageSanityData => {
    const { _rawIllustration, _rawIngress, _rawTitle, _rawFrontpageStories } = data;

    return {
        title: getSanityContentWithLocale(_rawTitle, locale),
        ingress: getSanityContentWithLocale(_rawIngress, locale),
        illustration: {
            title: _rawIllustration.name,
            svg: _rawIllustration.svg
        },
        stories: _rawFrontpageStories.map((story) => {
            return {
                title: getSanityContentWithLocale(
                    story._type === 'frontpageLink' ? story.title : story.page.title,
                    locale
                ),
                description: getSanityContentWithLocale(story.content, locale),
                illustration: story.illustration,
                isPageSlug: story._type === 'frontpagePageLink',
                url: story._type === 'frontpageLink' ? story.url : story.page.slug ? `/${story.page.slug.current}` : ''
            };
        })
    };
};

export interface FrontpageSanityData {
    title: string;
    ingress: string;
    illustration: SanityIllustrationSchema;
    stories?: FrontpageStory[];
}

interface FrontpageStory {
    title: string;
    description: string;
    illustration: SanityIllustrationSchema;
    url: string;
    isPageSlug: boolean;
}

const Hovedside: React.FunctionComponent<Props> = ({ data, intl }: Props & InjectedIntlProps & RouterProps) => {
    const { title, ingress, illustration, stories: linkPanels } = extractFrontpageData(
        data.allSanityFrontpage.nodes[0],
        intl.locale
    );
    return (
        <Frontpage
            header={
                <FrontpagePoster
                    title={title}
                    illustration={<SanityIllustration illustration={illustration} maintainAspectRatio={true} />}>
                    <SanityBlockContent content={ingress} />
                </FrontpagePoster>
            }>
            <Box>
                <FrontpagePanelWrapper>
                    {linkPanels &&
                        linkPanels.map((story, index) => (
                            <LinkPanel
                                key={index}
                                title={story.title}
                                url={{ url: story.url, isPageSlug: story.isPageSlug }}
                                image={
                                    story.illustration ? (
                                        <SanityIllustration illustration={story.illustration} />
                                    ) : (
                                        undefined
                                    )
                                }>
                                <SanityBlockContent content={story.description} />
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
                _id
                _rawTitle
                _rawIngress
                _rawIllustration(resolveReferences: { maxDepth: 4 })
                _rawFrontpageStories(resolveReferences: { maxDepth: 4 })
                _rawRelated(resolveReferences: { maxDepth: 4 })
            }
        }
    }
`;

export default injectIntl(Hovedside);
