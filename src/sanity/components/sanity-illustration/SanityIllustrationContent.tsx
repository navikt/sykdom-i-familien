import React from 'react';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import { IllustrationDocument } from '../../types/documents';

interface Props {
    illustration: IllustrationDocument;
    title?: string;
    width?: string;
    height?: string;
    inline?: boolean;
    maintainAspectRatio?: boolean;
    viewBox?: string;
}

const SanityIllustration: React.FunctionComponent<Props> = ({ illustration, ...props }) => {
    return illustration.svg ? <InlineSVG {...props} illustration={illustration.svg} /> : null;
};

export default SanityIllustration;
