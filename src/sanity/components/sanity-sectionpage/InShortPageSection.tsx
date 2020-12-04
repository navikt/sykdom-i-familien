import { Ingress } from 'nav-frontend-typografi';
import React from 'react';
import Box from '../../../components/layout/box/Box';
import SectionIcon from '../../../components/sectionPanel/SectionIcon';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import SanityBlock from '../sanity-block/SanityBlock';
import { SanitySectionPageSectionContent } from './SanitySectionPage';

interface Props {
    section: SanitySectionPageSectionContent;
}

const InShortPageSection = ({ section }: Props) => {
    const { slug, title, illustration, content } = section;
    return (
        <div className="inShortSection">
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
            </SectionPanel>
        </div>
    );
};

export default InShortPageSection;
