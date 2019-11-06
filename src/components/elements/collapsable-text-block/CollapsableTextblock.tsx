import React, { useState } from 'react';
import bemUtils from '../../../utils/bemUtils';
import CollapseToggler from './CollapseToggler';
import './collapsableTextBlock.less';
import { Element } from 'nav-frontend-typografi';
import CollapseContainer from '../collapsable-container/CollapsableContainer';
import { guid } from 'nav-frontend-js-utils';
import PrintOnly from '../print-only/PrintOnly';
import ScreenOnly from '../screen-only/ScreenOnly';

interface Props {
    children: React.ReactNode;
    initialOpen?: boolean;
    title?: string;
}

const bem = bemUtils('collapsableTextBlock');

const CollapsableTextBlock: React.FunctionComponent<Props> = ({ children, initialOpen, title }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [contentId] = useState(guid());

    const titleBlock = (
        <Element tag="h3" className={bem.element('title')}>
            {title}
        </Element>
    );

    return (
        <div className={bem.block}>
            <ScreenOnly>
                <div className={bem.element('toggler')}>
                    <CollapseToggler onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} contentId={contentId}>
                        {titleBlock}
                    </CollapseToggler>
                </div>
                <div className={bem.element('content')} id={contentId}>
                    <CollapseContainer isOpen={isOpen}>{children}</CollapseContainer>
                </div>
            </ScreenOnly>
            <PrintOnly>
                {titleBlock}
                {children}
            </PrintOnly>
        </div>
    );
};

export default CollapsableTextBlock;
