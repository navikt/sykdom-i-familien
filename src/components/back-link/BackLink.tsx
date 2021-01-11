import React from 'react';

import Chevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';

import bemUtils from '../../utils/bemUtils';

import './backLink.less';

interface Props {
    className?: string;
    href: string;
    ariaLabel?: string;
    children: React.ReactNode;
    onClick?: (href: string, history: History, event: React.SyntheticEvent) => void;
}

const bem = bemUtils('backLink');

const BackLink = ({ className, href, children, ariaLabel }: Props) => {
    return (
        <div className={`${bem.block} ${className}`}>
            <Chevron className={bem.element('chevron')} type="venstre" />
            <Lenke className={bem.element('link')} href={href} ariaLabel={ariaLabel}>
                {children}
            </Lenke>
        </div>
    );
};

export default BackLink;
