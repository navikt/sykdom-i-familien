import React from 'react';
import { RouterProps } from '@reach/router';
import Box from '../../../components/layout/box/Box';
import FrontpagePanelWrapper from '../../../components/pages/frontpage/components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import LinkPanel from '../../../components/pages/frontpage/components/link-panel/LinkPanel';
import PageBanner from '../../../components/pages/frontpage/components/page-banner/PageBanner';
import Frontpage from '../../../components/pages/frontpage/Frontpage';
import SanityBlock from '../../../sanity/components/sanity-block/SanityBlock';
import SanityIllustration from '../../../sanity/components/sanity-illustration/SanityIllustrationContent';
import SanityMessage from '../../../sanity/components/sanity-message/SanityMessage';
import { FrontpageSanityData } from '../../../sanity/utils/frontpageUtils';
import { Site } from '../../../utils/site';

interface Props {
    data: FrontpageSanityData;
    site?: Site;
}

const SanityFrontpage: React.FunctionComponent<Props> = ({ data, site }: Props & RouterProps) => {
    const { showLanguageToggle, title, metadescription, ingress, message, illustration, stories: linkPanels } = data;

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
                ) : undefined
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
            </Box>
        </Frontpage>
    );
};

export default SanityFrontpage;
