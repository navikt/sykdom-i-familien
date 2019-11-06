import React, { useState } from 'react';
import bemUtils from '../../../utils/bemUtils';
import CollapseToggler from './CollapseToggler';
import './collapsableTextBlock.less';
import { Element } from 'nav-frontend-typografi';
import CollapseContainer from '../collapsable-container/CollapsableContainer';

interface Props {
    children: React.ReactNode;
    initialOpen?: boolean;
    title?: string;
    collapseLabel?: string;
}

const bem = bemUtils('collapsableTextBlock');

const CollapsableTextBlock: React.FunctionComponent<Props> = ({
    children,
    initialOpen,
    title,
    collapseLabel = 'lukk'
}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const titleBlock = (
        <Element tag="h3" className={bem.element('title')}>
            {title}
        </Element>
    );

    return (
        <div className={bem.block}>
            <div className={bem.element('toggler')}>
                <CollapseToggler onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                    {titleBlock}
                </CollapseToggler>
            </div>
            <div className={bem.element('content')}>
                <CollapseContainer isOpen={isOpen}>{children}</CollapseContainer>
            </div>
        </div>
    );
};

export default CollapsableTextBlock;
