import React from 'react';
import CircleMask from '../circle-mask/CircleMask';
import { IllustrationDocument } from '../../../sanity/types/documents';
import InlineSVG from '../inline-svg/InlineSVG';

interface Props {
    illustration: IllustrationDocument;
    backgroundColor?: string;
    size?: string;
}

const CircleIllustration: React.FunctionComponent<Props> = ({
    illustration,
    backgroundColor,
    size = '6rem'
}: Props) => (
    <CircleMask size={size} valign="bottom" color={backgroundColor}>
        <InlineSVG illustration={illustration.svg} fullSizeSvg={true} />
    </CircleMask>
);

export default CircleIllustration;
