import React from 'react';
import MediaQuery from 'react-responsive';
import CircleIllustration from '../elements/circle-illustration/CircleIllustration';
import { IllustrationDocument } from '../../sanity/types/documents';

interface Props {
    illustration: IllustrationDocument;
}

const SectionIcon: React.FunctionComponent<Props> = ({ illustration }) => (
    <>
        <MediaQuery maxWidth={600}>
            <CircleIllustration illustration={illustration} size="5rem" />
        </MediaQuery>
        <MediaQuery maxWidth={800} minWidth={601}>
            <CircleIllustration illustration={illustration} />
        </MediaQuery>
    </>
);

export default SectionIcon;
