import React from 'react';
import CircleMask from '../circle-mask/CircleMask';
import SanityInlineSVG from '../sanity/sanity-inline-svg/SanityInlineSVG';
import { SanityIllustrationNode } from '../../types/sanity-schema/sanityIllustrationNode';

interface Props {
    illustration: SanityIllustrationNode;
    backgroundColor?: string;
    size?: string;
}

const CircleIllustration: React.FunctionComponent<Props> = ({
    illustration,
    backgroundColor,
    size = '6rem'
}: Props) => (
    <CircleMask size={size} valign="bottom" color={backgroundColor}>
        <SanityInlineSVG illustration={illustration} width={size} />
    </CircleMask>
);

export default CircleIllustration;
