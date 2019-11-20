import React from 'react';
import { parseAndModifySvg } from './inlineSvgUtils';
import './inlineSvg.less';
import bemUtils from '../../../utils/bemUtils';

export interface InlineSVGProps {
    illustration: string;
    title?: string;
    width?: string;
    height?: string;
    inline?: boolean;
    maintainAspectRatio?: boolean;
    fullSizeSvg?: boolean;
    viewBox?: string;
}

const bem = bemUtils('inlineSVG');

const InlineSVG: React.FunctionComponent<InlineSVGProps> = (props) => {
    const svgHtml = parseAndModifySvg(props);
    if (!svgHtml) {
        return null;
    }
    return (
        <div
            className={bem.classNames(bem.block, bem.modifierConditional('fullSizeSVG', props.fullSizeSvg))}
            style={{ display: props.inline ? 'inline-block' : 'block' }}
            dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
    );
};

export default InlineSVG;
