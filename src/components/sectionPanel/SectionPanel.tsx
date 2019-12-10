import React, { ReactNode } from 'react';
import PanelBase from 'nav-frontend-paneler';
import bemUtils from '../../utils/bemUtils';
import TitleWithLine from '../elements/titleWithLine/TitleWithLine';

import './sectionPanel.less';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: string;
    illustrationPlacement?: 'inside' | 'outside';
}

const SectionPanel = ({
    id,
    title,
    illustration,
    children,
    titleTag = 'h2',
    illustrationPlacement = 'inside'
}: Props) => {
    return (
        <section
            tabIndex={-1}
            id={id}
            aria-label={title}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside'
                )
            )}>
            <PanelBase className={bem.element('panel')}>
                {illustration && <div className={bem.element('illustration')}>{illustration}</div>}
                {title && (
                    <div className={bem.element('title')}>
                        <TitleWithLine title={title} tag={titleTag} />
                    </div>
                )}
                {children}
            </PanelBase>
        </section>
    );
};

export default SectionPanel;
