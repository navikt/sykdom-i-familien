import React from 'react';
import MediaQuery from 'react-responsive';
import CircleIllustration from '../elements/circle-illustration/CircleIllustration';
import { IllustrationDocument } from '../../sanity/types/documents';
import { isBrowser } from '../../utils/build';

interface Props {
    illustration: IllustrationDocument;
}

const SectionIcon: React.FunctionComponent<Props> = ({ illustration }) => (
    <>
        {isBrowser && (
            <>
                <MediaQuery maxWidth={600}>
                    <CircleIllustration illustration={illustration} size="5rem" />
                </MediaQuery>
                <MediaQuery minWidth={601}>
                    <CircleIllustration illustration={illustration} />
                </MediaQuery>
            </>
        )}
        {!isBrowser && (
            <>
                <CircleIllustration illustration={illustration} />
            </>
        )}
    </>
);

export default SectionIcon;
