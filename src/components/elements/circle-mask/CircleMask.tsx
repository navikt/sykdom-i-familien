import React, { CSSProperties } from 'react';
import bemUtils from '../../../utils/bemUtils';

import './circleMask.less';

interface Props {
    active?: boolean;
    color?: string;
    size?: string;
    scaleSvg?: boolean;
    valign?: 'top' | 'bottom';
}

const bem = bemUtils('circleMask');

const CircleMask: React.StatelessComponent<Props> = ({
    color,
    size,
    active = true,
    scaleSvg = true,
    valign,
    children
}) => {
    const style: Partial<CSSProperties> = {
        backgroundColor: color
    };
    if (size) {
        style.width = size;
        style.height = size;
    }
    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('inactive', active === false),
                bem.modifierConditional(`valign-${valign}`, valign !== undefined),
                bem.modifierConditional(`scaleSvg`, scaleSvg === true)
            )}
            style={style}>
            <div className={bem.element('content')}>{children}</div>
        </div>
    );
};

export default CircleMask;
