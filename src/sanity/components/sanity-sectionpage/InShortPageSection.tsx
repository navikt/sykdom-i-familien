import { Ingress } from 'nav-frontend-typografi';
import React from 'react';
import Box from '../../../components/layout/box/Box';
import SectionIcon from '../../../components/sectionPanel/SectionIcon';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import { Site } from '../../../utils/site';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import SanityBlock from '../sanity-block/SanityBlock';
import { SanitySectionPageSectionContent } from './SanitySectionPage';

interface Props {
    section: SanitySectionPageSectionContent;
    site: Site;
    inShortEkstraKomponenter: string[];
}

const InShortPageSection = ({ section, site, inShortEkstraKomponenter }: Props) => {
    const { slug, title, illustration, content } = section;
    return (
        <div className="inShortSection">
            <Box margin={illustration ? 'none' : 'xxxl'}>
                <SectionPanel
                    titleTag="h2"
                    id={slug}
                    title={title}
                    illustration={
                        illustration ? (
                            <Box textAlignCenter={true} margin="none">
                                <SectionIcon illustration={illustration} />
                            </Box>
                        ) : undefined
                    }
                    illustrationPlacement="outside">
                    {content && (
                        <Ingress className="inShortList formattedRichContent" tag="div">
                            <SanityBlock content={content} />
                        </Ingress>
                    )}
                    {(inShortEkstraKomponenter || []).map((infopanel: string, infopanelIndex) => {
                        return (
                            <SanityBlockContent site={site} content={infopanel} headingLevel={3} key={infopanelIndex} />
                        );
                    })}
                </SectionPanel>
            </Box>
        </div>
    );
};

export default InShortPageSection;
