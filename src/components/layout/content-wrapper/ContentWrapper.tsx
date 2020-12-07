import React, { HTMLProps } from 'react';
import bemUtils from '../../../utils/bemUtils';
import './contentWrapper.less';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    maxWidth?: 'wide' | 'normal';
}

const bem = bemUtils('contentWrapper');

const ContentWrapper = ({ children, className, maxWidth = 'normal', ...rest }: Props) => (
    <div className={bem.classNames(bem.block, className, bem.modifier(maxWidth))} {...rest}>
        {children}
    </div>
);

export default ContentWrapper;
