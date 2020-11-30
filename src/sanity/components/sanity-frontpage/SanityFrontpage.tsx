import React from 'react';
import { RouterProps } from '@reach/router';
import Box from '../../../components/layout/box/Box';
import FrontpagePanelWrapper from '../../../components/pages/frontpage/components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import LinkPanel from '../../../components/pages/frontpage/components/link-panel/LinkPanel';
import PageBanner from '../../../components/pages/frontpage/components/page-banner/PageBanner';
import Frontpage from '../../../components/pages/frontpage/Frontpage';
import SanityBlock from '../../../sanity/components/sanity-block/SanityBlock';
import SanityIllustration from '../../../sanity/components/sanity-illustration/SanityIllustrationContent';
import { FrontpageSanityData } from '../../../sanity/utils/frontpageUtils';
import { Site } from '../../../utils/site';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';

interface Props {
    data: FrontpageSanityData;
    site?: Site;
}

const SanityFrontpage: React.FunctionComponent<Props> = ({ data, site }: Props & RouterProps) => {
    const { showLanguageToggle, title, metadescription, ingress, content, illustration, stories: linkPanels } = data;
    const isDefaultSite = site === Site.sykdomIFamilien;
    return (
        <Frontpage
            showLanguageToggle={showLanguageToggle}
            pageTitle={title}
            pageMetaDescription={metadescription}
            useWhiteBackground={isDefaultSite === false}
            header={
                <PageBanner
                    title={title}
                    illustration={
                        illustration ? (
                            <SanityIllustration illustration={illustration} maintainAspectRatio={true} />
                        ) : undefined
                    }>
                    {ingress && <SanityBlock content={ingress} />}
                </PageBanner>
            }>
            {content && (
                <Box margin="l">
                    <SanityBlockContent content={content} headingLevel={1} />
                </Box>
            )}
            {linkPanels && (
                <FrontpagePanelWrapper maxColumns={isDefaultSite ? 3 : 2}>
                    {linkPanels.map((story, index) => (
                        <LinkPanel
                            key={index}
                            title={story.title || ''}
                            site={site}
                            url={{ url: story.url, isPageSlug: story.isPageSlug }}
                            image={
                                story.illustration ? (
                                    <SanityIllustration illustration={story.illustration} />
                                ) : undefined
                            }>
                            {story.description && <SanityBlock content={story.description} />}
                        </LinkPanel>
                    ))}
                </FrontpagePanelWrapper>
            )}
        </Frontpage>
    );
};

export default SanityFrontpage;
