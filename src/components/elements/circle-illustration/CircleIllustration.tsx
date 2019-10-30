import React from 'react';
import CircleMask from '../circle-mask/CircleMask';
import SanityIllustration from '../../../sanity/components/sanity-illustration/SanityIllustrationContent';
import { SanityIllustrationSchema } from '../../../sanity/schema-types';

interface Props {
    illustration: SanityIllustrationSchema;
    backgroundColor?: string;
    size?: string;
}

const CircleIllustration: React.FunctionComponent<Props> = ({
    illustration,
    backgroundColor,
    size = '6rem'
}: Props) => (
    <CircleMask size={size} valign="bottom" color={backgroundColor}>
        <SanityIllustration illustration={illustration} width={size} />
    </CircleMask>
);

export default CircleIllustration;
