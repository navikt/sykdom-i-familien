import React, { CSSProperties } from 'react';
import bemUtils from '../../utils/bemUtils';

import './circleMask.less';

interface Props {
    active?: boolean;
    color?: string;
    size?: string;
    valign?: 'top' | 'bottom';
}

const bem = bemUtils('circleMask');

const CircleMask: React.StatelessComponent<Props> = ({ color, size, active = true, valign, children }) => {
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
                bem.class,
                bem.modifierConditional('inactive', active === false),
                bem.modifierConditional(`valign-${valign}`, valign !== undefined)
            )}
            style={style}>
            <div className={bem.element('content')}>{children}</div>
        </div>
    );
};

export default CircleMask;
