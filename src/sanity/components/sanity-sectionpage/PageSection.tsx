import React from 'react';
import Box from '../../../components/layout/box/Box';
import SectionIcon from '../../../components/sectionPanel/SectionIcon';
import SectionPanel from '../../../components/sectionPanel/SectionPanel';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';
import { SanitySectionPageSectionContent } from './SanitySectionPage';

interface Props {
    section: SanitySectionPageSectionContent;
}

const PageSection = ({ section }: Props) => {
    return (
        <SectionPanel
            id={section.slug}
            title={section.title}
            illustration={
                section.illustration ? (
                    <Box textAlignCenter={true} margin="none">
                        <SectionIcon illustration={section.illustration} />
                    </Box>
                ) : undefined
            }>
            {section.content && <SanityBlockContent content={section.content} headingLevel={2} />}
        </SectionPanel>
    );
};

export default PageSection;
