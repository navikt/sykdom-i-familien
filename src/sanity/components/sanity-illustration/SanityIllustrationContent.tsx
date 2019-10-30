import React from 'react';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import { SanityIllustrationSchema } from '../../schema-types';

interface Props {
    illustration: SanityIllustrationSchema;
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
