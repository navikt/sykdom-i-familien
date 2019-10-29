import React from 'react';
import { SanityIllustrationNode } from '../../../types/sanity-schema/sanityIllustrationNode';
import InlineSVG from '../../inline-svg/InlineSVG';

interface Props {
    illustration: SanityIllustrationNode;
    title?: string;
    width?: string;
    height?: string;
    inline?: boolean;
    maintainAspectRatio?: boolean;
    viewBox?: string;
}

const SanityInlineSVG: React.FunctionComponent<Props> = ({ illustration, ...props }) => {
    return illustration.svg ? <InlineSVG {...props} illustration={illustration.svg} /> : null;
};

export default SanityInlineSVG;
