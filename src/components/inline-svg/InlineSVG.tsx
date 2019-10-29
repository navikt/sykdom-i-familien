import React from 'react';
import { parseAndModifySvg } from './inlineSvgUtils';

export interface InlineSVGProps {
    illustration: string;
    title?: string;
    width?: string;
    height?: string;
    inline?: boolean;
    maintainAspectRatio?: boolean;
    viewBox?: string;
}

const InlineSVG: React.FunctionComponent<InlineSVGProps> = (props) => {
    const svgHtml = parseAndModifySvg(props);
    if (!svgHtml) {
        return null;
    }
    return (
        <div
            style={{ lineHeight: 0, display: props.inline ? 'inline-block' : 'block' }}
            dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
    );
};

export default InlineSVG;
