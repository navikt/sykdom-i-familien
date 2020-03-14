import React, { useState } from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Element } from 'nav-frontend-typografi';
import { SanityContentHeadingLevel } from '../../../sanity/types';
import { getHeadingTag } from '../../../sanity/utils';
import bemUtils from '../../../utils/bemUtils';
import CollapseContainer from '../collapsable-container/CollapsableContainer';
import PrintOnly from '../print-only/PrintOnly';
import ScreenOnly from '../screen-only/ScreenOnly';
import CollapseToggler from './CollapseToggler';
import './collapsableTextBlock.less';

interface Props {
    children: React.ReactNode;
    initialOpen?: boolean;
    title?: string;
    headingLevel: SanityContentHeadingLevel;
    isFaq?: boolean;
}

const bem = bemUtils('collapsableTextBlock');

const CollapsableTextBlock: React.FunctionComponent<Props> = ({
    children,
    headingLevel,
    initialOpen,
    isFaq,
    title
}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [contentId] = useState(guid());

    const titleBlock = (
        <Element tag={getHeadingTag(headingLevel)} className={bem.element('title')}>
            {title}
        </Element>
    );

    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('open', isOpen),
                bem.modifierConditional('faq', isFaq)
            )}>
            <ScreenOnly>
                <div className={bem.element('toggler')}>
                    <CollapseToggler onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} contentId={contentId}>
                        {titleBlock}
                    </CollapseToggler>
                </div>
                <CollapseContainer isOpen={isOpen}>
                    <div className={bem.element('content')} id={contentId}>
                        {children}
                    </div>
                </CollapseContainer>
            </ScreenOnly>
            <PrintOnly>
                {titleBlock}
                {children}
            </PrintOnly>
        </div>
    );
};

export default CollapsableTextBlock;
